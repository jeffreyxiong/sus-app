import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
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

class ParticipantStart extends Component {
	constructor(props) {
		super(props);
		this.state = { participantText: '', notesText: '' };
	}

	_handleChange = (text) => {
		this.setState(text);
	}

	_handleContinue = () => {
		console.log(this.state.participantText);
		let res = AppService.checkParticipant(this.props.studyName, this.state.participantText);
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
					notes: this.state.notesText
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
			<View style = { styles.main }>
				<View style = { styles.form }>
					<Text style = { styles.prompt }>After you create the participant, hand them the device to conduct a SUS survey.</Text>
					<View style={ styles.section }>
						<Text style = { styles.question }>Participant ID:</Text>
						<TextInput 
							style = { styles.textField }
							onChangeText = { (participantText) => this._handleChange({ participantText }) }
							value = { this.state.participantText }
							returnKeyLabel = { "done" }
							returnKeyType = { "done" }
							placeholder = "ex: 001"
						/>
					</View>
					<View style={ styles.section }>
						<Text style = { styles.question }>Experimentor Notes:</Text>
						<TextInput 
							style = {[ styles.textField, styles.multilineTextField ]}
							onChangeText = { (notesText) => this._handleChange({ notesText }) }
							multiline = { true }
							returnKeyLabel = { "done" }
							returnKeyType = { "done" }
							blurOnSubmit = { true }
							value = { this.state.notesText }
							placeholder = "ex: Stopped two times during experiment"
						/>
					</View>
				</View>
				<View style = { styles.buttons }>
					<TouchableBox
						onPress = { this._handleContinue }
						disabled = { false }
						style = { { width: 300, height: 80, backgroundColor: "#69A6D7" } }
						textStyle = { { color: "white" } }
						text = "Continue"
					/>
				</View>
			</View>
		);
	}

}

export default ParticipantStart;