
import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AppService from '../../AppService';

const styles = StyleSheet.create({
	textField: {
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		height: 50, 
		borderColor: 'gray', 
		borderBottomWidth: 1
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

class NewStudySystems extends Component {

	constructor(props) {
		super(props);
		this.state = {text: '', study: undefined};
	}

	_handleContinue = () => {
		// Ask user to try again if study name exists
		var res = AppService.addStudy(this.state.text);
		this.setState({study: res});
		if (res == -1) {
			Alert.alert(
				'Error: Duplicate Entry', 
				'A study with this name already exists.', 
				[
					{text: "Ok, I'll rename.", onPress: () => {} }
				]);
		} else if (res == -2) {
			Alert.alert(
				'Error: Invalid Entry', 
				'A study must have a non-empty name.', 
				[
					{text: "Ok, I'll rename.", onPress: () => {} }
				]);
		} else {
			this.props.navigator.push({
				screen: 'mobilesus.NewStudySystems',
				title: this.state.text,
				passProps: {
					name: this.state.text,
					callback: this.clearStudy
				},
				backButtonHidden: true
			});
		}		
	}

	clearStudy = (name) => {
		AppService.removeStudy(name);
	}

	_handleBack = () => {
		this.props.navigator.pop({
			animated: true
		});
	}

	_handleChange = (text) => {
		this.setState({text});
	}

	render () {
		return (
				<View>
					<View style = {styles.form}>
						<Text style = {styles.question}>Enter the name of the study:</Text>
						<TextInput 
							style = {styles.textField}
							onChangeText = {(text) => this._handleChange(text)}
							value = {this.state.text}
							placeholder = "Name"
						/>
					</View>
					<View style = {styles.buttons}>
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

export default NewStudySystems;