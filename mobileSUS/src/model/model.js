// model.js
// Schemas for realm

export const StudySchema = {
	name: 'Study',
	primaryKey: 'name',
	properties: {
		name: 'string',
		date: 'date',
		systems: {type: 'list', objectType: 'System'}
	}
};

export const SystemSchema = {
	name: 'System',
	primaryKey: 'name',
	properties: {
		name: 'string',
		participants: {type: 'list', objectType: 'Participant'}
	}
};

export const ParticipantSchema = {
	name: 'Participant',
	primaryKey: 'id',
	properties: {
		id: 'string',
		date: 'date',
		survey: {type: 'list', objectType: 'Score'}
	}
};

export const ScoreSchema = {
	name: 'Score',
	primaryKey: 'id',
	properties: {
		id: 'string',
		value: 'int'
	}
};