import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage, Alert } from 'react-native';
import AppService from '../AppService';
import TouchableBox from '../components/TouchableBox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

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
		try {
			const value = await AsyncStorage.getItem('email');
			if (value !== null){
			  	// We have data!!
			  	text = value
			} else {
				console.log('No prior email entered')
			}
		} catch (error) {
			console.log('Failed to retrieve from AsyncStorage')
		}
		this.state = { emailText: text };
    }
	
	_handleContinue = () => {
		if(this.emailText === '') {
			Alert.alert(
				'Error: No Email Specified', 
				'Please specify an email.', 
				[
					{text: "Ok, I'll enter my email.", onPress: () => {} }
				]);
		} else {
			AppService.exportStudy(this.props.studyName, this.emailText);

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

    render() {
		return (
			<View style = { styles.main }>
				<View style = { styles.form }>
					<Text style = { styles.prompt }>Data for this file will be in emailed as a tab delimited file. </Text>
					<View style = { styles.section }>
						<Text style = { styles.question }>Email Address:</Text>
						<TextInput 
							style = { styles.textField }
							onChangeText = { (emailText) => this._handleChange({ emailText }) }
							value = { this.state.emailText }
							returnKeyLabel = { "done" }
							returnKeyType = { "done" }
							placeholder = "Ex: pkortum@rice.edu"
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