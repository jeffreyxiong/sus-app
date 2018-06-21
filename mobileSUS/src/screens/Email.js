import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import AppService from '../AppService';
import TouchableBox from '../components/TouchableBox';
import { CheckBox } from 'react-native-elements';

const styles = StyleSheet.create({
	main: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	form: {
		flex: 3
	},
	checkbox: {
		margin: 15,
	},
	textField: {
		margin: 15,
		borderColor: '#979797', 
		borderWidth: 1,
		borderRadius: 10,
		padding: 15,
		fontSize: 14
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

export default class Email extends Component {

    constructor(props) {
		super(props);
		text = ''
		check = false
		email = AppService.getEmail();
		if (email != null) {
			text = email.email;
			check = true;
		}
		this.state = { emailText: text, checked: check };
		
	}
	
	_handleContinue = () => {
		if(this.state.emailText === '') {
			Alert.alert(
				'Error: No Email Specified', 
				'Please specify an email.', 
				[
					{text: "Ok, I'll enter my email.", onPress: () => {} }
				]);
		} else {
			if (this.state.checked) {
				console.log('checked');
				AppService.addEmail(this.state.emailText);
			} else {
				AppService.removeEmail();
			}

			AppService.exportStudy(this.props.studyName, this.state.emailText, this.callback);

			this.props.navigator.resetTo({
				screen: 'mobilesus.Home',
				title: 'SUS App',
				animated: true
			});

		}		
	}

	_handleChange = (text) => {
		this.setState(text);
	}

	onClose(data) {
		// data = {type, title, message, action}
		// action means how the alert was closed.
		// returns: automatic, programmatic, tap, pan or cancel
	}



    render() {
		return (
			<View style = { styles.main }>
				<View style = { styles.form }>
					<Text style = { styles.prompt }>Data for this file will be emailed as a tab delimited file.</Text>
					<View style = { styles.section }>
						<Text style = { styles.question }>Email Address:</Text>
						<TextInput 
							style = { styles.textField }
							onChangeText = { (emailText) => this._handleChange({ emailText }) }
							value = { this.state.emailText }
							returnKeyLabel = { "done" }
							returnKeyType = { "done" }
							placeholder = "Ex: phil@usableproducts.com"
						/>
						<Text style = { styles.question }>Do you want to remember this email?</Text>
						<CheckBox
							title='Yes'
							style={ styles.checkbox }
							checked={ this.state.checked }
							onPress={ () => this.setState({ checked: !this.state.checked }) }
						/>
					</View>
					<View style = { styles.buttons }>
						<TouchableBox
							onPress = { this._handleContinue }
							disabled = { false }
							style = { { width: 300, height: 80, backgroundColor: "#69A6D7" } }
							textStyle = { {  color: "white" } }
							text = "Send"
						/>
					</View>
				</View>
			</View>
		);
	}
}