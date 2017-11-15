import Realm from 'realm';
import Exporter from './Exporter'
import { StudySchema, ParticipantSchema, ScoreSchema } from './model/model';

let realm = new Realm({
	schema: [StudySchema, ParticipantSchema, ScoreSchema]
});

class AppService {

	constructor () {}

	addStudy(studyName) {
		// Check for duplicate
		let study = this.getStudy(studyName);
		if (typeof study != 'undefined') return -1;
		if (studyName === "") return -2;
		let today = new Date();
		realm.write(() => {
			realm.create('Study', {name: studyName, date: today, participants: []});
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

	addParticipant(studyName, participantID) {
		let p = realm.objectForPrimaryKey('Participant', studyName + "." + participantID);
		if (typeof p != 'undefined') return -1;
		if (participantID === "") return -2;

		var study = this.getStudy(studyName);
		let today = new Date();
		realm.write(() => {
			const participant = realm.create('Participant', {id: studyName + "." + participantID, date: today, notes: "", survey: []});
			study.participants.push(participant);
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

	getStat(studyName) {
		let study = this.getStudy(studyName);
		if (typeof study != 'undefined') {
			var sysmin = 5;
			var sysmax = 0;
			var total = 0;
			var count = 0;
			for (var participant of study.participants) {
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
			for (var participant of study.participants) {
				var score = this.getScore(participant.id);
				total += Math.pow(score - sysmean, 2);
			}
			var sysstd = Math.sqrt(total / count);
			return {mean: sysmean, std: sysstd, min: sysmin, max: sysmax}
		}
	}

	exportStudy(studyName) {
		// Check out MailGun -- service for sending emails
		var study = this.getStudy(studyName);
		var data = 'Study Name\tParticipant ID\tSUS 1\tSUS 2\tSUS 3\tSUS 4\tSUS 5\tSUS 6\tSUS 7\tSUS 8\tSUS 9\tSUS Score\n'
		if (typeof study != 'undefined') {
			for (var participant of study.participants) {
				data += study.name + '\t' + 
						this.parseAppendedName(participant.id) + '\t'
				for (var score of participant.survey) {
					data += score.value + '\t'
				}
				data += this.getScore(participant.id) + '\n'
				console.log(data);
			}
			Exporter.writeAndEmailCSV(data, studyName)
		}
	}
}

let App = new AppService();
Object.freeze(App);

export default App; 