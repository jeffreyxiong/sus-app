// @flow

import RNFS from 'react-native-fs';
import { SERVER_URL } from 'react-native-dotenv';
import Blob from 'rn-fetch-blob';

class FileService {

	constructor () {}

	_log = (text) => {
		console.log('FileService: ' + text);
	}

	_documentPath = (path) => {
		return RNFS.DocumentDirectoryPath + '/' + this._filename(path);
	}

	_filename = (name) => {
		return name + '.txt'
	}

	deleteFile = (product) => {
		var path = this._documentPath(product);
		RNFS.exists(path)
			.then((success) => {
				if (success) {
					RNFS.unlink(path)
						.then((success) => {
							this._log(path + ' deleted');
						})
						.catch((error) => {
							this._log(error.message);
						});
				} else {
					this._log(path + ' does not exist')
				}
			})
			.catch((error) => {
				this._log(error.message);
			});
	}

	writeFile = (product, data) => {
		var path = this._documentPath(product);

		RNFS.writeFile(path, data, 'utf8')
			.then((success) => {
				this._log(path + ' written');
				return path;
			})
			.catch((error) => {
				this._log(error.message);
				return null;
			});
	}

	emailFile = (product, email) => {

		return new Promise((resolve, reject) => {
			Blob.fetch('POST', SERVER_URL, {
				'Content-Type' : 'multipart/form-data',
			}, [{ 	
					name: 'email', 
					data: email
				},
				{ 	
					name: 'product', 
					data: product
				},
				{ 
					name: 'file', 
					filename: this._filename(product), 
					data: Blob.wrap(this._documentPath(product)),
				  	type:'text/plain', 
				},
			]).then((res) => {
				this._log(res.text());
				resolve();
			}).catch((error) => {
				this._log(error);
				reject();
			});
		});	
	}


}

let fs = new FileService();
Object.freeze(fs);

export default fs;