import RNFS from 'react-native-fs';
import { SERVER_URL } from 'react-native-dotenv';
import RNFetchBlob from 'react-native-fetch-blob';

class FileService {

	constructor () {

	}

	deleteFile(study) {
		var path = RNFS.DocumentDirectoryPath + '/' + study + '.txt';
		RNFS.exists(path)
			.then((success) => {
				if (success) {
					RNFS.unlink(path)
						.then((success) => {
							console.log('FILE DELETED');
						})
						.catch((err) => {
							console.log(err.message);
						});
				} else {
					console.log('FILE DOES NOT EXIST')
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	}

	writeFile(study) {
		var path = RNFS.DocumentDirectoryPath + '/' + study + '.txt';
		
	}

	writeAndEmailCSV(data, study, email, callback) {
		
		RNFS.writeFile(path, data, 'utf8')
			.then((success) => {
				console.log('FILE WRITTEN!');
				console.log(path)
			})
			.catch((err) => {
				console.log(err.message);
			});

		console.log(data)
		console.log(study)
		console.log(email)
		console.log(SERVER_URL)
		
		RNFetchBlob.fetch('POST', SERVER_URL, {
			'Content-Type' : 'multipart/form-data',
		}, [
			{ name: 'email', data: email},
			{ name: 'study', data: study},
			{ name: 'file', filename: study + '.txt', type:'text/plain', data: RNFetchBlob.wrap(path)},
		]).then((res) => {
			console.log(res.text());
			// this.callback(true);
		}).catch((err) => {
			console.log(err);
			// this.callback(false);
		});
	}


}

let fs = new FileService();
Object.freeze(fs);

export default fs;