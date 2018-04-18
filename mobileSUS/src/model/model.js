// model.js
// Schemas for realm

export const StudySchema = {
	name: 'Study',
	primaryKey: 'name',
	properties: {
		name: 'string',
		date: 'date',
		description: 'string',
		participants: {type: 'list', objectType: 'Participant'}
	}
};

export const ParticipantSchema = {
	name: 'Participant',
	primaryKey: 'id',
	properties: {
		id: 'string',
		date: 'date',
		notes: 'string',
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