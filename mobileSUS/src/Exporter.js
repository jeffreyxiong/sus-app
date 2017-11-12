var MailGun = require('mailgun-es6');
var RNFS = require('react-native-fs');

var apiKey = "key-fe27c961e1555cfa2e5226a4b5c9e280";
var domain = "sandboxd93144ba368b41549c37bac4ef7ae5b0.mailgun.org";

class Exporter {

	constructor () {

	}

	writeAndEmailCSV(data, study) {
		var path = RNFS.DocumentDirectoryPath + '/' + study + '.txt';
		RNFS.writeFile(path, data, 'utf8')
			.then((success) => {
				console.log('FILE WRITTEN!');
				console.log(path)
			})
			.catch((err) => {
				console.log(err.message);
			});

		this.emailCSV(path)
	}

	emailCSV(csv) {

	}


}

let Exp = new Exporter();
Object.freeze(Exp);

export default Exp