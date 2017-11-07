import Realm from 'realm';
import Exporter from './Exporter'
import { StudySchema, SystemSchema, ParticipantSchema, ScoreSchema } from './model/model';

let realm = new Realm({
	schema: [StudySchema, SystemSchema, ParticipantSchema, ScoreSchema]
});

class AppService {

	constructor () {

	}

	addStudy(studyName) {
		// Check for duplicate
		let study = realm.objectForPrimaryKey('Study', studyName)
		if (typeof study != 'undefined') return -1;
		if (studyName === "") return -2;

		let today = new Date();
		realm.write(() => {
			realm.create('Study', {name: studyName, date: today, systems: []});
		});
		return 0;
	}

	getStudy(studyName) {
		return realm.objectForPrimaryKey('Study', studyName);
	}

	removeStudy(studyName) {
		let study = realm.objectForPrimaryKey('Study', studyName)
		if (typeof study != 'undefined') {

			for (var system of study.systems) {
				for (var participant of system.participants) {
					realm.write(() => {
						realm.delete(participant.survey);
					});
				}
				realm.write(() => {
					realm.delete(system.participants);
				});
			}
			realm.write(() => {
				
				realm.delete(study.systems);
				realm.delete(study);
			});
		}
	}

	removeSystem(systemName) {
		let system = realm.objectForPrimaryKey('System', systemName);
		if (typeof system != 'undefined') {
			for (var participant of system.participants) {
				realm.write(() => {
					realm.delete(participant.survey);
				});
			}
			realm.write(() => {
				realm.delete(system.participants);
			});
		}
		realm.write(() => {	
			realm.delete(system);
		});
	}

	getStudies() {
		return realm.objects('Study');
	}

	addSystem(studyName, systemName) {
		// Check for duplicate
		let s = realm.objectForPrimaryKey('System', systemName);
		if (typeof s != 'undefined') return -1;

		var study = realm.objectForPrimaryKey('Study', studyName);
		var systems = study.systems;
		realm.write(() => {
			const system = realm.create('System', {name: systemName, participants: []});
			systems.push(system);
		});
	}

	addSystems(studyName, systemNames) {
		var study = realm.objectForPrimaryKey('Study', studyName);
		var invalidCount = 0;
		// Catch duplicate error early
		var unique = systemNames
					.map((n) => {return {count: 1, name: n}})
					.reduce((a, b) => {
						a[b.name] = (a[b.name] || 0) + b.count;
						return a;
					}, {});
		var dup = Object.keys(unique).filter((a) => unique[a] > 1);

		if (unique[""] === systemNames.length) return -2;
		if (typeof dup.find((a) => a === "" ) != 'undefined' && dup.length > 1) return -1;
		if (typeof dup.find((a) => a === "" ) === 'undefined' && dup.length > 0) return -1;

		for (var systemName of systemNames) {
			if (systemName === "") continue;

			let s = realm.objectForPrimaryKey('System', studyName + "." + systemName);
			if (typeof s != 'undefined') return -1;

			realm.write(() => {
				// Create systems		
				const system = realm.create('System', {name: studyName + "." + systemName, participants: []});
				study.systems.push(system);
			});
		}

		return 0;
	}

	addParticipant(systemName, participantID) {
		if (participantID === "") return -2;
		let p = realm.objectForPrimaryKey('Participant', participantID);
		if (typeof p != 'undefined') return -1;

		var system = realm.objectForPrimaryKey('System', systemName);
		let today = new Date();
		realm.write(() => {
			const participant = realm.create('Participant', {id: systemName + "." + participantID, date: today, survey: []});
			system.participants.push(participant);
		});

		return 0;
	}

	addScore(participantID, qid, value) {
		let p = realm.objectForPrimaryKey('Participant', participantID);
		console.log(participantID);
		if (typeof p === 'undefined') return -1;
		realm.write(() => {
			const score = realm.create('Score', {id: participantID + "." + qid, value: value}, true);
			p.survey.push(score);
		});
	}

	parseAppendedName(name) {
		return name.substring(name.indexOf(".") + 1, name.length);
	}

	getScore(participantID) {
		let p = realm.objectForPrimaryKey('Participant', participantID);
		var i = 1;
		var s = 0;
		for (var score of p.survey) {
			if (i % 2 == 0) {
				s += 5 - score.value;
			} else {
				s += score.value - 1;
			}
			i += 1;
		}

		return s * 2.5;
	}

	getStat(systemName) {
		let system = realm.objectForPrimaryKey('System', systemName);
		if (typeof system != 'undefined') {
			var sysmin = 5;
			var sysmax = 0;
			var total = 0;
			var count = 0;
			for (var participant of system.participants) {
				var score = this.getScore(participant.id);
				if (score > sysmax) {
					sysmax = score;
				} else if (score < sysmin) {
					sysmin = score;
				}
				total += score;
				count += 1
			}
			var sysmean = total / count;
			total = 0
			for (var participant of system.participants) {
				var score = this.getScore(participant.id);
				total += Math.pow(score - sysmean, 2);
			}
			var sysstd = Math.sqrt(total / count);
			return {mean: sysmean, std: sysstd, min: sysmin, max: sysmax}
		}
	}

	exportStudy(studyName) {
		// Check out MailGun -- service for sending emails
		var study = realm.objectForPrimaryKey('Study', studyName);
		var data = 'Study Name\tSystem Name\tParticipant ID\tSUS 1\tSUS 2\tSUS 3\tSUS 4\tSUS 5\tSUS 6\tSUS 7\tSUS 8\tSUS 9\tSUS Score\n'
		if (typeof study != 'undefined') {
			for (var system of study.systems) {
				for (var participant of system.participants) {
					data += study.name + '\t' + 
							this.parseAppendedName(system.name) + '\t' + 
							this.parseAppendedName(this.parseAppendedName(participant.id))
					for (var score of participant.survey) {
						data += '\t' + score.value
					}
					data += this.getScore(participant.id) + '\n'
					console.log(data);
				}
			}
			Exporter.writeAndEmailCSV(data, studyName)
		}
	}

	exportSystem(systemName) {
		var system = realm.objectForPrimaryKey('System', systemName);
		var data = 'System Name\tParticipant ID\tSUS 1\tSUS 2\tSUS 3\tSUS 4\tSUS 5\tSUS 6\tSUS 7\tSUS 8\tSUS 9\tSUS Score\n'
		if (typeof system != 'undefined') {
			for (var participant of system.participants) {
				data += this.parseAppendedName(system.name) + '\t' + 
						this.parseAppendedName(this.parseAppendedName(participant.id)) + '\t'
				for (var score of participant.survey) {
					data += score.value + '\t'
				}
				data += this.getScore(participant.id) + '\n'
				console.log(data);
			}
			Exporter.writeAndEmailCSV(data, systemName)
		}
	}
}

let App = new AppService();
Object.freeze(App);

export default App; 