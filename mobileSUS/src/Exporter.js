import RNFS from 'react-native-fs';
import { AsyncStorage } from 'react-native';
import { SERVER_URL } from 'react-native-dotenv'

class Exporter {

	constructor () {

	}

	writeAndEmailCSV(data, study, email) {
		var path = RNFS.DocumentDirectoryPath + '/' + study + '.txt';
		RNFS.writeFile(path, data, 'utf8')
			.then((success) => {
				console.log('FILE WRITTEN!');
				console.log(path)
				this.emailCSV(path, email, study);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}

	emailCSV(path, email, study) {
		var file = new File(path);
		var formData = new FormData();
		formData.append('email', email)
		formData.append('file', file);
		formData.append('study', study);
		
		var request = new XMLHttpRequest();
		request.open('GET', SERVER_URL);
		request.send(formData);

		try {
			await AsyncStorage.setItem('email', email);
		} catch (error) {
			console.log('failed to save email')
		}
	}


}

let Exp = new Exporter();
Object.freeze(Exp);

export default Exp