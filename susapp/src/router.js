// @flow

import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import StatusBarAlert from 'react-native-statusbar-alert';
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

import { colors, dims } from './global';

const HomeStack = createStackNavigator(
	{
		Home: Home,
		Product: Product,
		Email: Email,
		NewProduct: NewProduct,
		NewParticipant: NewParticipant,
		SurveyInstructions: Instructions,
		SurveyQuestions: Questions,
		SurveyFinish: Finish,
		SurveyHandoff: Handoff,
		SurveyReview: Review,
	}, 
	{
		initialRouteName: 'Home',
		navigationOptions: {
			headerStyle: {
				backgroundColor: 'white',
				shadowColor: 'transparent',
				shadowOpacity: 0, 
				borderBottomWidth: 0,
				elevation: 0,
			},
			headerTintColor: colors.darkBlue,
			headerTitleStyle: {
				color: 'black',
				fontSize: dims.textMedium,
				fontWeight: '500',
			},
			headerBackTitle: null,
		},
		cardStyle: {
			backgroundColor: 'white',
			shadowColor: 'transparent',
			shadowOpacity: 0, 
		},
		transitionConfig: () => ({
			containerStyle: {
			}
		}),
	},
);

const RootStack = createStackNavigator(

	{
		Main: HomeStack,
		Info: Info,
	},
	{
		mode: 'modal',
		headerMode: 'none',
	},
);

const mapStateToProps = state => ({
	email: state.email,
});

class Root extends Component {

	componentWillReceiveProps(props) {
		this.setState({
			alert: true,
			happy: props.email,
		});
		setTimeout(() => { 
			this.setState({ alert: null })
		}, 3000);
	}

	state = {
		alert: null,
		happy: true,
	}

	render() {
        return (
			<View style = {{ flex: 1, backgroundColor: 'white' }}>
				<StatusBar />
				<StatusBarAlert
					visible = { this.state.alert != null }
					message = { this.state.happy == true ? "Email was sent successfully." : "Error sending email. Try again later!" }
					backgroundColor = { this.state.happy == true ? colors.alertGreen : colors.alertRed }
					color = "white"
					height = { 35 } />
				<RootStack />
			</View>
        );
    }
}

Root = connect(
	mapStateToProps,
)(Root)

export default Root;

