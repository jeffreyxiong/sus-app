import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TouchableBox from '../../components/TouchableBox';

const styles = StyleSheet.create({
	instructions: {
		flex: 1,
		marginTop: 15,
		marginBottom: 15,
		marginLeft: 15,
		marginRight: 15
	},
	start: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	home: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around'
	}
});

class SurveyStart extends Component {

	constructor(props) {
		super(props);
	}

	_handleStart = () => {
		this.props.navigator.resetTo({
			screen: 'mobilesus.SurveyQuestion',
			title: 'SUS Survey',
			animated: true,
			passProps: {
				participantID: this.props.participantID
			}
		});
	}

	render() {
		return (
			<View style = {styles.home}>
				<View style = {styles.instructions}>
					<Text> Instructions </Text>
					<Text> {'\u2022'} For each of the following questions: </Text>
					<Text> {'\u2022'} Keep in mind the system you just used. </Text>
					<Text> {'\u2022'} Reflect your immediate response to each statement. </Text>
					<Text> {'\u2022'} Don't think too long on each one. </Text>
					<Text> {'\u2022'} Make sure you respond to each statement. </Text>
				</View>
				<View style = {styles.start}>
					<TouchableBox 
						onPress = { () => this._handleStart() }
						backgroundColor = {{backgroundColor: "#D3D3D3"}}
						text = "Start"
						textColor = {{color: "#000"}}
					/>
				</View>
			</View>
		);
	}
}

export default SurveyStart;