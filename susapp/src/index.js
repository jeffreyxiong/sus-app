
import { Navigation } from 'react-native-navigation';

import Home from './screens/Home';
import Info from './screens/Info';
import Product from './screens/Product';
import NewProduct from './screens/NewProduct';
import NewParticipant from './screens/NewParticipant';
import SurveyStart from './screens/survey/SurveyStart';
import SurveyQuestion from './screens/survey/SurveyQuestion';
import SurveyFinish from './screens/survey/SurveyFinish';
import SurveyReview from './screens/survey/SurveyReview';
import SurveyInterstitial from './screens/survey/SurveyInterstitial';
import Email from './screens/Email';
import Success from './screens/notifications/Success';
import Fail from './screens/notifications/Fail';
import { colors } from './global';

// Export screens
export default () => {
	Navigation.registerComponent('screen.Home', 			() => Home);
	Navigation.registerComponent('screen.Info', 			() => Info);
	Navigation.registerComponent('screen.Product', 			() => Product);
	Navigation.registerComponent('screen.NewProduct', 		() => NewProduct);
	Navigation.registerComponent('screen.NewParticipant', 	() => NewParticipant);
	Navigation.registerComponent('screen.Email', 			() => Email);
	
	Navigation.registerComponent('survey.Start', 			() => SurveyStart);
	Navigation.registerComponent('survey.Question', 		() => SurveyQuestion);
	Navigation.registerComponent('survey.Finish', 			() => SurveyFinish);
	Navigation.registerComponent('survey.Interstitial', 	() => SurveyInterstitial);
	Navigation.registerComponent('survey.Review', 			() => SurveyReview);
	
	
	Navigation.registerComponent('note.Success', 			() => Success);
	Navigation.registerComponent('note.Fail', 				() => Fail);

	Navigation.startSingleScreenApp({
		screen: {
			screen:'screen.Home',
			title:'Home',
			navigatorStyle: {
				navBarLeftButtonColor: colors.darkBlue,
				navBarRightButtonColor: colors.darkBlue,
				navBarButtonColor: colors.darkBlue,
			},
		},
		appStyle: { navBarNoBorder: true, },
		passProps: {},
		animationType: 'slide-down'
	});
}