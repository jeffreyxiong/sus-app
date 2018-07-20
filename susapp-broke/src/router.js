// @flow

import { createStackNavigator } from 'react-navigation';
import Home from './screens/Home';
import Info from './screens/Info';
import Email from './screens/Email';
import NewProduct from './screens/NewProduct';
import NewParticipant from './screens/NewParticipant';
import Product from './screens/Product';
import Instructions from './screens/survey/Instructions';
import Questions from './screens/survey/Questions';
import Finish from './screens/survey/Finish';
import Handoff from './screens/survey/Handoff';
import Review from './screens/survey/Review';

import { colors } from './global';

const HomeStack = createStackNavigator(
	{
		Home: {
			screen: Home,
		},
		Product: {
			screen: Product,
		},
		Email: {
			screen: Email
		},
		NewProduct: {
			screen: NewProduct,
		},
		NewParticipant: {
			screen: NewParticipant,
		},
		SurveyInstructions: {
			screen: Instructions,
		},
		SurveyQuestions: {
			screen: Questions,
		},
		SurveyFinish: {
			screen: Finish,
		},
		SurveyHandoff: {
			screen: Handoff,
		},
		SurveyReview: {
			screen: Review,
		},
	}, 
	{
		initialRouteName: 'Home',
		navigationOptions: {
			headerStyle: {
				backgroundColor: 'white',
				shadowColor: 'transparent',
				borderBottomWidth: 0,
				elevation: 0,
			},
			headerTintColor: colors.darkBlue,
			headerTitleStyle: {
				color: 'black',
				fontSize: 18,
			},
			headerBackTitle: null,
		},
		cardStyle: {
			backgroundColor: 'white',
		},
		transitionConfig: () => ({
			containerStyle: {
			}
		}),
	},
);

export const RootStack = createStackNavigator(

	{
		Main: {
			screen: HomeStack,
		},
		Info: {
			screen: Info,
		}
	},
	{
		mode: 'modal',
		headerMode: 'none',
	},
);



