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
		this.state = {text1: '', text2: '', text3: ''};
	}

	handleFinish = () => {
		// Save data to Realm
		var res = AppService.addSystems(this.props.name, Object.values(this.state));
		if (res == -1) {
			Alert.alert(
				'Error: Duplicate Entry', 
				'Duplicate systems / products entered.', 
				[
					{text: "Ok, I'll rename.", onPress: () => {} }
				]);
		} else if (res == -2) {
			Alert.alert(
				'Error: Invalid Entry', 
				'Must create at least one system / product.', 
				[
					{text: "Ok, I'll create one.", onPress: () => {} }
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

	handleBack = () => {
		this.props.callback(this.props.name);
		this.props.navigator.pop({
			animated: true
		});
	}

	render () {
		return (
				<View>
					<View>
						<Text style = {styles.question}>Enter the name(s) of the systems or products you will be testing:</Text>
						<TextInput 
							style = {styles.textField}
							onChangeText = {(text1) => this.setState({text1})}
							value = {this.state.text1}
							placeholder = "System Name"
						/>
						<TextInput 
							style = {styles.textField}
							onChangeText = {(text2) => this.setState({text2})}
							value = {this.state.text2}
							placeholder = "System Name"
						/>
						<TextInput 
							style = {styles.textField}
							onChangeText = {(text3) => this.setState({text3})}
							value = {this.state.text3}
							placeholder = "System Name"
						/>
					</View>
					<View style = {styles.buttons}>
						<Button
							onPress = {this.handleBack}
							title = "Back"
						/>
						<Button
							onPress = {this.handleFinish}
							title = "Finish"
						/>
					</View>
				</View>
			);
	}
}

export default NewStudySystems;