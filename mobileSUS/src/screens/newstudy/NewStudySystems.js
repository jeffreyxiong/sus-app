import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AppService from '../../AppService';

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
						<Text> Enter the name(s) of the systems or products you will be testing: </Text>
						<TextInput 
							style = {{height: 50, borderColor: 'gray', borderWidth: 1}}
							onChangeText = {(text1) => this.setState({text1})}
							value = {this.state.text1}
						/>
						<TextInput 
							style = {{height: 50, borderColor: 'gray', borderWidth: 1}}
							onChangeText = {(text2) => this.setState({text2})}
							value = {this.state.text2}
						/>
						<TextInput 
							style = {{height: 50, borderColor: 'gray', borderWidth: 1}}
							onChangeText = {(text3) => this.setState({text3})}
							value = {this.state.text3}
						/>
					</View>
					<View>
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