import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Home from './src/screens/Home';
// import Info from './screens/Info';
import Product from './src/screens/Product';
// import NewProduct from './screens/NewProduct';
// import NewParticipant from './screens/NewParticipant';
// import SurveyStart from './screens/survey/SurveyStart';
// import SurveyQuestion from './screens/survey/SurveyQuestion';
// import SurveyFinish from './screens/survey/SurveyFinish';
// import SurveyReview from './screens/survey/SurveyReview';
// import SurveyInterstitial from './screens/survey/SurveyInterstitial';
// import Email from './screens/Email';
// import Success from './screens/notifications/Success';
// import Fail from './screens/notifications/Fail';

class HomeScreen extends Component {
	render() {
		return (
			<View>
				<Text>Hello World</Text>
			</View>
		);
	}
}

const Root = createStackNavigator(
	{
		Home: {
			screen: HomeScreen
		},
		Product: {
			screen: Product
		}
	},
	{
   		initialRouteName: 'Home',
	},
);

export default class App extends Component {

	render() {
		console.log("why...!!?!?!")
	  	return <Root />;
	}

}