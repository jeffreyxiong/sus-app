import { Navigation } from 'react-native-navigation';
import Home from './screens/Home';
import Study from './screens/Study';
import DataView from './screens/DataView';
import ParticipantStart from './screens/ParticipantStart';
import NewStudy from './screens/NewStudy';
import SurveyStart from './screens/newsurvey/SurveyStart';
import SurveyQuestion from './screens/newsurvey/SurveyQuestion';

// Export screens
export default () => {
	Navigation.registerComponent('mobilesus.Home', () => Home);
	Navigation.registerComponent('mobilesus.NewStudy', () => NewStudy);
	Navigation.registerComponent('mobilesus.Study', () => Study);
	Navigation.registerComponent('mobilesus.ParticipantStart', () => ParticipantStart);
	Navigation.registerComponent('mobilesus.SurveyStart', () => SurveyStart);
	Navigation.registerComponent('mobilesus.SurveyQuestion', () => SurveyQuestion);
	Navigation.registerComponent('mobilesus.DataView', () => DataView);

	Navigation.startSingleScreenApp({
		screen: {
			screen:'mobilesus.Home',
			title:'SUS App',
			navigatorStyle: {},
			navigatorButtons: {}
		},
		passProps: {},
		animationType: 'slide-down'
	});
}