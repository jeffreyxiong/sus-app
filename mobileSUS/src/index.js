import { Navigation } from 'react-native-navigation';
import Home from './screens/Home';
import Study from './screens/Study';
import System from './screens/System';
import DataView from './screens/DataView';
import ParticipantStart from './screens/ParticipantStart';
import NewStudyName from './screens/newstudy/NewStudyName';
import NewStudySystems from './screens/newstudy/NewStudySystems';
import SurveyStart from './screens/newsurvey/SurveyStart';
import SurveyQuestion from './screens/newsurvey/SurveyQuestion';

// Export screens
export default () => {
	Navigation.registerComponent('mobilesus.Home', () => Home);
	Navigation.registerComponent('mobilesus.NewStudyName', () => NewStudyName);
	Navigation.registerComponent('mobilesus.NewStudySystems', () => NewStudySystems);
	Navigation.registerComponent('mobilesus.Study', () => Study);
	Navigation.registerComponent('mobilesus.System', () => System);
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