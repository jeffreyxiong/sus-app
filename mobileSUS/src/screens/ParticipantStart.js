import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import AppService from '../AppService';

const styles = StyleSheet.create({
	textField: {
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		height: 50, 
		borderColor: 'gray', 
		borderBottomWidth: 1
	},
	multiTextField: {
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		height: 150, 
		borderColor: 'gray', 
		borderWidth: 1
	},
	question: {
		marginTop: 15,
		marginLeft: 15
	},
	buttons: {
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});

class ParticipantStart extends Component {
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
					participantID: this.props.systemName + "." + this.state.participantText,
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
					<Text style = {styles.question}> Participant ID: </Text>
					<TextInput 
						style = {styles.textField}
						onChangeText = {(participantText) => this._handleChange({participantText})}
						value = {this.state.participantText}
						placeholder = "Participant ID"
					/>
					<Text style = {styles.question}> Experimentor Notes: </Text>
					<TextInput 
						style = {styles.multiTextField}
						onChangeText = {(notesText) => this._handleChange({notesText})}
						multiline = {true}
						value = {this.state.notesText}
						placeholder = " Notes"
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

export default ParticipantStart;