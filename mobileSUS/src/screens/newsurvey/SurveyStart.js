import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import TouchableBox from '../../components/TouchableBox';

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
				participantName: this.props.participantName
			}
		});
	}

	render() {
		return (
			<View>
				<View>
					<Text> Instructions </Text>
				</View>
				<View>
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