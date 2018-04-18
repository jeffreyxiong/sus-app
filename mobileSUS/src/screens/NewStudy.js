
import React, { Component } from 'react';
import { View, Text, TextInput, Alert, Keyboard, StyleSheet } from 'react-native';
import AppService from '../AppService';
import TouchableBox from '../components/TouchableBox';

const styles = StyleSheet.create({
	main: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	form: {
		flex: 3
	},
	textField: {
		margin: 15,
		borderColor: '#979797', 
		borderWidth: 1,
		borderRadius: 10,
		padding: 15,
		fontSize: 14
	},
	multilineTextField: {
		height: 150,
		paddingTop: 15,
	},
	prompt: {
		margin: 15,
		fontSize: 16,
		fontWeight: '600'
	},
	question: {
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		fontSize: 16
	},
	section: {
		marginTop: 10
	},
	buttons: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: 15,
	}
});

class NewStudy extends Component {

	constructor(props) {
		super(props);
		this.state = { nameText: '', descriptionText: '', study: undefined };
	}

	_handleContinue = () => {
		// Ask user to try again if study name exists
		var res = AppService.addStudy(this.state.nameText, this.state.descriptionText);
		this.setState({study: res});
		if (res == -1) {
			Alert.alert(
				'Error: Duplicate Entry', 
				'A product with this name already exists.', 
				[
					{text: "Ok, I'll rename.", onPress: () => {} }
				]);
		} else if (res == -2) {
			Alert.alert(
				'Error: Invalid Entry', 
				'A product must have a non-empty name.', 
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
		this.setState(text);
	}

	clearStudy = (name) => {
		AppService.removeStudy(name);
	}

	render () {
		return (
				<View style = { styles.main }>
					<View style = { styles.form }>
						<Text style = { styles.prompt }>This is what you are collecting data for.</Text>
						<View style = { styles.section }>
							<Text style = { styles.question }>Name of the Product:</Text>
							<TextInput 
								style = { styles.textField }
								onChangeText = { (nameText) => this._handleChange({ nameText }) }
								value = { this.state.nameText }
								returnKeyLabel = { "done" }
								returnKeyType = { "done" }
								placeholder = "Ex: iPhone X Notch"
							/>
						</View>
						<View style = { styles.section }>
							<Text style = { styles.question }>Description:</Text>
							<TextInput 
								style = {[ styles.textField, styles.multilineTextField ]}
								onChangeText = { (descriptionText) => this._handleChange({ descriptionText }) }
								value = { this.state.descriptionText }
								returnKeyLabel = { "done" }
								returnKeyType = { "done" }
								blurOnSubmit = { true }
								placeholder = "Ex: Testing on college students in portrait mode"
								multiline = { true }
								numberOfLines = { 4 }
							/>
						</View>
					</View>
					<View style = { styles.buttons }>
						<TouchableBox
							onPress = { this._handleContinue }
							disabled = { false }
							style = { { width: 300, height: 80, backgroundColor: "#69A6D7" } }
							textStyle = { {  color: "white" } }
							text = "Continue"
						/>
					</View>
				</View>
			);
	}
}

export default NewStudy;