import Realm from 'realm';
import FileService from './FileService'
import { ProductSchema, ParticipantSchema, ScoreSchema, EmailSchema } from './schema';

/*
Interface for app to interact with the database and backend layers.
*/

export const realm = new Realm({
	schema: [ ProductSchema, ParticipantSchema, ScoreSchema, EmailSchema ]
});

class AppService {

	constructor () {}

	/**************************************************************************
	 * email
	 *************************************************************************/

	getEmail() {
		return realm.objectForPrimaryKey('Email', 0)
	}
	
	addEmail(email) {
		let e = this.getEmail();
		if (typeof e != 'undefined') {
			this.removeEmail();
		}
		realm.write(() => {
			realm.create('Email', {id: 0, email: email});
		});
	}

	removeEmail() {
		let e = this.getEmail();
		if (typeof e != 'undefined') {
			realm.write(() => {
				realm.delete(this.getEmail());
			});
		}
	}

	/**************************************************************************
	 * product
	 *************************************************************************/

	getProduct(name) {
		return realm.objectForPrimaryKey('Product', name);
	}

	getProducts() {
		return realm.objects('Product');
	}

	addProduct(name, desc, system) {
		// Check for duplicate
		let product = this.getProduct(name);
		if (typeof product != 'undefined') return -1;
		if (name === '') return -2;

		// Create Realm data object
		realm.write(() => {
			realm.create('Product', 
						{ name: name, 
						  description: desc, 
						  system: system, 
						  date: new Date(), 
						  participants: [], 
						});
		});
		return 0;
	}

	removeProduct(name) {
		let product = this.getProduct(name);

		if (typeof product != 'undefined') {
			for (var participant of product.participants) {
				realm.write(() => {
					realm.delete(participant.survey);
				});
			}
			realm.write(() => {
				realm.delete(product.participants);
				realm.delete(product);
			});
		}

		FileService.deleteFile(name);
	}

	/**************************************************************************
	 * participant
	 *************************************************************************/

	checkParticipant(productName, id) {
		let p = realm.objectForPrimaryKey('Participant', this.append(productName, id));

		if (typeof p != 'undefined') return -1;
		if (id === '') return -2;

		return 0;
	}

	addParticipant(productName, id, notes) {
		id = this.append(productName, id);
		let p = realm.objectForPrimaryKey('Participant', id);
		
		if (typeof p != 'undefined') return -1;
		if (id === '') return -2;

		var product = this.getProduct(productName);
		realm.write(() => {
			const participant = realm.create('Participant', { id: id, 
															  date: new Date(),
															  notes: notes, 
															  survey: [] }
											);
			product.participants.push(participant);
		});

		return 0;
	}

	/***************************************************************************
	 * score
	 **************************************************************************/
	
	calcScore(values) {
		var s = 0;

		for (var j = 0; j < values.length; j++) {
			if ((j + 1) % 2 == 0) {
				s += 5 - values[j];
			} else {
				s += values[j] - 1;
			}
		}

		return s * 2.5;
	}

	getScore(id) {
		let p = realm.objectForPrimaryKey('Participant', id);
		return this.calcScore(p.survey.map(x => x.value));
	}

	addScore(product, id, qid, value) {
		id = this.append(product, id);
		let p = realm.objectForPrimaryKey('Participant', id);

		if (typeof p === 'undefined') return -1;

		realm.write(() => {
			const score = realm.create('Score', {id: this.append(id, qid), value: value}, true);
			p.survey.push(score);
		});
	}

	/**************************************************************************
	 * statistics
	 *************************************************************************/

	getStat(product) {
		let p = this.getProduct(product);

		if (typeof p != 'undefined') {
			var stat = {
				size: p.participants.length,
				mean: 0,
				min: 0,
				max: 0,
				std: 0,
			}

			if (stat.size == 0) return stat;

			var scores = p.participants.map(x => this.getScore(x.id));

			stat.mean = scores.reduce((x, y) => (x + y) / stat.size);
			if (stat.size == 1) stat.std = 0;
			else {
				stat.std = Math.sqrt(scores.map(x => Math.pow(x - stat.mean, 2))
									   .reduce((x, y) => (x + y)) / (stat.size - 1));
			}
			stat.min = scores.reduce((x, y) => Math.min(x, y));
			stat.max = scores.reduce((x, y) => Math.max(x, y));
			
			return this.truncate(stat);
		}
	}

	/**************************************************************************
	 * export
	 *************************************************************************/

	exportProduct(product, emailAddr) {
		var p = this.getProduct(product);

		if (typeof p != 'undefined') {
			var data = 'Product Name\t \
					Participant ID\t \
					Notes\t \
					SUS 1\t \
					SUS 2\t \
					SUS 3\t \
					SUS 4\t \
					SUS 5\t \
					SUS 6\t \
					SUS 7\t \
					SUS 8\t \
					SUS 9\t \
					SUS 10\t \
					SUS Score\n'

			for (var participant of p.participants) {
				data += this.tabulate([ p.name, 
										this.parse(participant.id),
										participant.notes ])
				data += this.tabulate(participant.survey.map(x => x.value))
				data += this.getScore(participant.id) + '\n'
			}
			
			FileService.writeFile(product, data);

			// Returns a promise
			return FileService.emailFile(product, emailAddr);
		}
	}

	/**************************************************************************
	 * helpers
	 *************************************************************************/

	append(head, tail) {
		return head + '.' + tail;
	}

	parse(id) {
		return id.substring(id.indexOf('.') + 1, id.length);
	}

	tabulate(words) {
		return words.join('\t') + '\t';
	}

	truncate(floats) {
		for (f in floats) {
			floats[f] = +floats[f].toFixed(3);
		}
		return floats;
	}
}

let App = new AppService();
Object.freeze(App);

export default App; 