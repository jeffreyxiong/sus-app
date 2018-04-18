import Realm from 'realm';
import Exporter from './Exporter'
import { StudySchema, ParticipantSchema, ScoreSchema } from './model/model';

let realm = new Realm({
	schema: [StudySchema, ParticipantSchema, ScoreSchema]
});

class AppService {

	constructor () {}

	addStudy(studyName, studyDescription) {
		// Check for duplicate
		let study = this.getStudy(studyName);
		if (typeof study != 'undefined') return -1;
		if (studyName === "") return -2;
		let today = new Date();
		realm.write(() => {
			realm.create('Study', {name: studyName, description: studyDescription, date: today, participants: []});
		});
		return 0;
	}

	getStudy(studyName) {
		return realm.objectForPrimaryKey('Study', studyName);
	}

	removeStudy(studyName) {
		let study = this.getStudy(studyName);
		if (typeof study != 'undefined') {
			for (var participant of study.participants) {
				realm.write(() => {
					realm.delete(participant.survey);
				});
			}
			realm.write(() => {
				realm.delete(study.participants);
				realm.delete(study);
			});
		}
	}

	getStudies() {
		return realm.objects('Study');
	}

	addParticipant(studyName, participantName, participantNotes) {
		let p = realm.objectForPrimaryKey('Participant', studyName + "." + participantName);
		if (typeof p != 'undefined') return -1;
		if (participantName === "") return -2;

		var study = this.getStudy(studyName);
		let today = new Date();
		realm.write(() => {
			const participant = realm.create('Participant', {id: studyName + "." + participantName, date: today, notes: participantNotes, survey: []});
			study.participants.push(participant);
		});

		return 0;
	}

	checkParticipant(studyName, participantName) {
		let p = realm.objectForPrimaryKey('Participant', studyName + "." + participantName);
		if (typeof p != 'undefined') return -1;
		if (participantName === "") return -2;
		return 0;
	}

	addScore(studyName, participantName, qid, value) {
		let p = realm.objectForPrimaryKey('Participant', studyName + "." + participantName);
		console.log(participantName);
		if (typeof p === 'undefined') return -1;
		realm.write(() => {
			const score = realm.create('Score', {id: participantName + "." + qid, value: value}, true);
			p.survey.push(score);
		});
	}

	parseAppendedName(name) {
		return name.substring(name.indexOf(".") + 1, name.length);
	}

	getScoreFromID(participantID) {
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

	getScore(rawData) {
		var i = 1;
		var s = 0;
		for (var j = 0; j < rawData.length; j++) {
			if (i % 2 == 0) {
				s += 5 - rawData[j];
			} else {
				s += rawData[j] - 1;
			}
			i += 1;
		}

		return s * 2.5;
	}

	getStat(studyName) {
		let study = this.getStudy(studyName);
		if (typeof study != 'undefined') {
			var sysmin = 101;
			var sysmax = 0;
			var total = 0;
			var count = 0;
			for (var participant of study.participants) {
				var score = this.getScoreFromID(participant.id);
				if (score > sysmax) {
					sysmax = score;
				} 
				if (score < sysmin) {
					sysmin = score;
				}
				total += score;
				count += 1
			}
			if (count == 0) {
				return {size: 0, mean: 0, std: 0, min: 0, max: 0}
			}
			var sysmean = total / count;
			total = 0
			for (var participant of study.participants) {
				var score = this.getScoreFromID(participant.id);
				total += Math.pow(score - sysmean, 2);
			}
			var sysstd = Math.sqrt(total / count);
			return {size: count, mean: sysmean, std: sysstd, min: sysmin, max: sysmax}
		}
	}

	exportStudy(studyName, emailAddr) {
		var study = this.getStudy(studyName);
		var data = 'Study Name\tParticipant ID\tNotes\tSUS 1\tSUS 2\tSUS 3\tSUS 4\tSUS 5\tSUS 6\tSUS 7\tSUS 8\tSUS 9\tSUS 10\tSUS Score\n'
		if (typeof study != 'undefined') {
			for (var participant of study.participants) {
				data += study.name + '\t' + 
						this.parseAppendedName(participant.id) + '\t' +
						participant.notes + '\t'
				for (var score of participant.survey) {
					data += score.value + '\t'
				}
				data += this.getScoreFromID(participant.id) + '\n'
				console.log(data);
			}
			Exporter.writeAndEmailCSV(data, studyName, emailAddr)
		}
	}
}

let App = new AppService();
Object.freeze(App);

export default App; 