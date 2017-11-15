
import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AppService from '../AppService';

const styles = StyleSheet.create({
	main: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
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
		marginLeft: 15,
		fontSize: 18
	},
	form: {
		flex: 1
	},
	buttons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});

class NewStudy extends Component {

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
			// Reset back to home screen
			this.props.navigator.resetTo({
				screen: 'mobilesus.Home',
				title: 'SUS App',
				animated: true
			});
		}		
	}

	_handleBack = () => {
		this.props.navigator.pop({
			animated: true
		});
	}

	_handleChange = (text) => {
		this.setState({text});
	}

	clearStudy = (name) => {
		AppService.removeStudy(name);
	}


	render () {
		return (
				<View style = {styles.main}>
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

export default NewStudy;