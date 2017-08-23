import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import AppService from '../AppService';

class System extends Component {
	constructor(props) {
		super(props);
		this.state = {participantText: '', notesText: ''};
	}

	_handleChange = (text) => {
		this.setState(text);
	}

	_handleContinue = () => {
		console.log(this.state.participantText);
		let res = AppService.addParticipant(this.props.systemName, this.state.participantText);
		if (res == -1) {
			Alert.alert(
				'Error: Duplicate Entry', 
				'A participant with this ID already exists.', 
				[
					{text: "Ok, I'll rename.", onPress: () => {} }
				]);
		} else if (res == -2) {
			Alert.alert(
				'Error: Invalid Entry', 
				'A participant must have a non-empty ID.', 
				[
					{text: "Ok, I'll rename.", onPress: () => {} }
				]);
		} else {	
			this.props.navigator.push({
				screen: 'mobilesus.SurveyStart',
				title: "SUS Instructions",
				passProps: {
					participantName: this.state.participantText,
					studyName: this.props.studyName,
					systemName: this.props.systemName
				},
				backButtonHidden: true
			})
		}
	}

	_handleBack = () => {
		this.props.navigator.pop({
			animated: true
		});
	}

	render () {
		return (
			<View>
				<View>
					<Text> Participant ID: </Text>
					<TextInput 
						style = {{height: 50, borderColor: 'gray', borderWidth: 1}}
						onChangeText = {(participantText) => this._handleChange({participantText})}
						value = {this.state.participantText}
						placeholder = "Participant ID"
					/>
					<Text> Experimentor Notes: </Text>
					<TextInput 
						style = {{height: 50, borderColor: 'gray', borderWidth: 1}}
						onChangeText = {(notesText) => this._handleChange({notesText})}
						value = {this.state.notesText}
						placeholder = "Notes"
					/>
				</View>
				<View>
					<Button 
						onPress = {this._handleBack}
						title = "Back"
					/>
					<Button
						onPress = {this._handleContinue}
						title = "Continue"
					/>
				</View>
			</View>
		);
	}

}

export default System;