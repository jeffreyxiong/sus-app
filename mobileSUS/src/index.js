import { Navigation } from 'react-native-navigation';
import Home from './screens/Home';
import Study from './screens/Study';
import NewStudy from './screens/NewStudy';
import ParticipantStart from './screens/ParticipantStart';
import SurveyStart from './screens/newsurvey/SurveyStart';
import SurveyQuestion from './screens/newsurvey/SurveyQuestion';
import SurveyFinish from './screens/newsurvey/SurveyFinish';
import SurveyReview from './screens/newsurvey/SurveyReview';
import SurveyInterstitial from './screens/newsurvey/SurveyInterstitial';
import Info from './screens/Info';
import Email from './screens/Email';

// Export screens
export default () => {
	Navigation.registerComponent('mobilesus.Home', () => Home);
	Navigation.registerComponent('mobilesus.NewStudy', () => NewStudy);
	Navigation.registerComponent('mobilesus.Study', () => Study);
	Navigation.registerComponent('mobilesus.ParticipantStart', () => ParticipantStart);
	Navigation.registerComponent('mobilesus.SurveyStart', () => SurveyStart);
	Navigation.registerComponent('mobilesus.SurveyQuestion', () => SurveyQuestion);
	Navigation.registerComponent('mobilesus.SurveyFinish', () => SurveyFinish);
	Navigation.registerComponent('mobilesus.SurveyReview', () => SurveyReview);
	Navigation.registerComponent('mobilesus.SurveyInterstitial', () => SurveyInterstitial);
	Navigation.registerComponent('mobilesus.Email', () => Email);
	Navigation.registerComponent('mobilesus.Info', () => Info);

	Navigation.startSingleScreenApp({
		screen: {
			screen:'mobilesus.Home',
			title:'Home',
			navigatorStyle: {
				navBarLeftButtonColor: '#69A6D7',
				navBarRightButtonColor: '#69A6D7',
				navBarButtonColor: '#69A6D7',
			},
		},
		passProps: {},
		appStyle: {
			navBarNoBorder: true,
		},
		animationType: 'slide-down'
	});
}