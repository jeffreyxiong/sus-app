import React, { Component } from 'react';
import Realm from 'realm';
import { StudySchema, SystemSchema, ParticipantSchema, RealmInt } from './model/model';

let realm = new Realm({
	schema: [StudySchema, SystemSchema, ParticipantSchema, RealmInt]
});

class AppService {

	constructor () {

	}

	addStudy(studyName) {

		let study = realm.objectForPrimaryKey('Study', studyName)
		if (typeof study != 'undefined') {
			return -1;
		}

		let today = new Date();
		realm.write(() => {
			realm.create('Study', {name: studyName, date: today, systems: []});
			return 0;
		});
	}

	getStudy(studyName) {
		return realm.objectForPrimaryKey('Study', studyName);
	}

	removeStudy(studyName) {
		let study = realm.objectForPrimaryKey('Study', studyName)
		if (typeof study != 'undefined') {
			realm.write(() => {
				realm.delete(study);
			})
		}
	}

	getStudies() {
		return realm.objects('Study');
	}

	addSystem(studyName, systemName) {
		var study = realm.objectForPrimaryKey('Study', studyName);
		var systems = study.systems;
		realm.write(() => {
			const system = realm.create('System', {name: systemName, participants: []});
			systems.push(system);
		});
	}

	addSystems(studyName, systemNames) {
		var study = realm.objectForPrimaryKey('Study', studyName);
		var systems = study.systems;
		for (var systemName of systemNames) {
			realm.write(() => {
				// Create systems		
				const system = realm.create('System', {name: studyName + "." + systemName, participants: []});
				systems.push(system);
			});
		}
	}

	addParticipant() {

	}
}

let App = new AppService();

export default App; 