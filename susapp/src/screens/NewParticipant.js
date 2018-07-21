import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Alert } from 'react-native';
import { common } from '../global';
import AppService from '../AppService';
import TextInput from '../components/TextInput';
import AddParticipant from '../containers/AddParticipant';

const styles = StyleSheet.create(common);

class NewParticipant extends Component {

	static navigationOptions = ({ navigation, screenProps }) => ({
		title: "Add a New Participant",
	});
	
	constructor(props) {
		super(props);
		this.productName = this.props.navigation.getParam('productName');
		this.state = { id: '', notes: '' };
		this.descInput = null;
	}

	/**************************************************************************
	 * event handlers
	 *************************************************************************/

	_handleChange = (text) => {
		this.setState(text);
	}

	_handleContinue = (callback) => {
		let res = AppService.checkParticipant(this.productName, this.state.id);
		
		if (res == -1) {
			Alert.alert(
				'Error', 
				'A participant with this ID already exists.', 
				[
					{text: 'Ok, I\'ll rename.', onPress: () => {} }
				]);
		} else if (res == -2) {
			Alert.alert(
				'Error', 
				'A participant must have a non-empty ID.', 
				[
					{text: 'Ok, I\'ll rename.', onPress: () => {} }
				]);
		} else {
			callback(this.state.id, this.state.notes);
			this.props.navigation.navigate('SurveyInstructions');
		}
	}

	_onContentSizeChange = ({ nativeEvent: event }) => {
		if (Platform.OS === 'android') {
			this.setState({ textareaHeight: event.contentSize.height })
		}
	}

	/**************************************************************************
	 * render
	 *************************************************************************/

	render () {
		return (
			<View style = { styles.container }>
				<View style = { styles.content }>
					<View style = { styles.paddedContainer }>
						<Text style = { styles.emphasis }>
							After you enter the participant ID and any notes, hand 
							the participant the device to complete a SUS survey.
						</Text>
						<Text style = { styles.spaced }>Participant ID:</Text>
						<TextInput 
							style = { styles.textField }
							onChangeText = { 
								(id) => this._handleChange({ id }) 
							}
							value = { this.state.id }
							returnKeyLabel = { 'next' }
							returnKeyType = { 'next' }
							placeholder = 'ex: 001'
							onSubmitEditing = { 
								(event) => this.descInput.focus()
							}
						/>
						<Text style = { styles.spaced }>Experimentor Notes:</Text>
						<TextInput 
							style = {[ styles.textField, styles.multilineField ]}
							onChangeText = { 
								(notes) => this._handleChange({ notes }) 
							}
							multiline = { true }
							numberOfLines = { 2 }
							returnKeyLabel = { 'done' }
							returnKeyType = { 'done' }
							blurOnSubmit = { true }
							value = { this.state.notes }
							placeholder = 'ex: Stopped two times during this experiment.'
							onContentSizeChange={ this._onContentSizeChange }
							inputRef = { 
								(input) => { this.descInput = input; }
							}
						/>
					</View>
				</View>
				<View style = { styles.footer }>
					<AddParticipant create = { this._handleContinue } />
				</View>
			</View>
		);
	}

}

export default NewParticipant;