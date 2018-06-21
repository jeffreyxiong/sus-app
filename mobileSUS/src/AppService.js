import Realm from 'realm';
import FileService from './FileService'
import { StudySchema, ParticipantSchema, ScoreSchema, EmailSchema } from './model';

/*

Interface for app to interact with the database and backend layers. 

Types of data:
	- Studies
	- Participants
	- Scores
	- Saved Email

*/


let realm = new Realm({
	schema: [StudySchema, ParticipantSchema, ScoreSchema, EmailSchema ]
});



class AppService {

	constructor () {}

	/*************************************************************************
	 * Email Data
	 ************************************************************************/

	getEmail() {
		return realm.objectForPrimaryKey('Email', 0)
	}
	
	addEmail(email) {
		let existing = this.getEmail();
		if (typeof existing != 'undefined') {
			this.removeEmail();
		}
		realm.write(() => {
			realm.create('Email', {id: 0, email: email});
		});
	}

	removeEmail() {
		let email = this.getEmail();
		if (typeof email != 'undefined') {
			realm.write(() => {
				realm.delete(this.getEmail());
			});
		}
	}

	/*************************************************************************
	 * Study Data
	 ************************************************************************/

	getStudy(studyName) {
		return realm.objectForPrimaryKey('Study', studyName);
	}

	getStudies() {
		return realm.objects('Study');
	}

	addStudy(studyName, studyDescription, systemName) {
		// Check for duplicate
		let study = this.getStudy(studyName);
		if (typeof study != 'undefined') return -1;
		if (studyName === "") return -2;

		// Create Realm data object
		realm.write(() => {
			realm.create('Study', 
						{ name: studyName, 
						  description: studyDescription, 
						  system: systemName, 
						  date: new Date(), 
						  participants: [], 
						});
		});
		return 0;
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

	/*************************************************************************
	 * Participant Data
	 ************************************************************************/

	checkParticipant(studyName, participantName) {
		let p = realm.objectForPrimaryKey('Participant', studyName + "." + participantName);
		if (typeof p != 'undefined') return -1;
		if (participantName === "") return -2;
		return 0;
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

	/*************************************************************************
	 * Score Data
	 ************************************************************************/
	
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
			return {size: count, mean: sysmean.toFixed(2), std: sysstd.toFixed(2), min: sysmin, max: sysmax}
		}
	}

	exportStudy(studyName, emailAddr, callback) {
		console.log(emailAddr);
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
			}
			FileService.writeAndEmailCSV(data, studyName, emailAddr, callback);
		}
	}
}

let App = new AppService();
Object.freeze(App);

export default App; 