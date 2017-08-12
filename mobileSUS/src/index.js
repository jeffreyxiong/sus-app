import { Navigation } from 'react-native-navigation';
import Home from './screens/Home';

export default () => {
	Navigation.registerComponent('mobilesus.Home', () => Home);

	Navigation.startSingleScreenApp({
		screen: {
			screen:'mobilesus.Home',
			title:'MobileSUS',
			navigatorStyle: {},
			navigatorButtons: {}
		},
		passProps: {},
		animationType: 'slide-down'
	});
}