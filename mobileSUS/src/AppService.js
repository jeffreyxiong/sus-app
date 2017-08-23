import Realm from 'realm';
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

	addScore(participantID, qid, score) {
		let p = realm.objectForPrimaryKey('Participant', participantID);
		if (typeof p === 'undefined') return -1;

		realm.write(() => {
			const score = realm.create('Score', {id: participantID + "." + qid, value: score}, true);
			p.survey.push(score);
		});
	}

	parseAppendedName(name) {
		return name.substring(name.indexOf(".") + 1, name.length);
	}

	exportStudy(studyName) {
		// Check out MailGun -- service for sending emails
	}
}

let App = new AppService();

export default App; 