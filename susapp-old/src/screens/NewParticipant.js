import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';

import { common, colors } from '../global';
import AppService from '../AppService';
import TouchableBox from '../components/TouchableBox';
import TextInput from '../components/TextInput';

const styles = StyleSheet.create(common);

class NewParticipant extends Component {
	
	constructor(props) {
		super(props);
		this.state = { id: '', notes: '' };

		this.descInput = null;
	}

	/**************************************************************************
	 * event handlers
	 *************************************************************************/

	_handleChange = (text) => {
		this.setState(text);
	}

	_handleContinue = () => {
		let res = AppService.checkParticipant(this.props.productName, this.state.id);
		
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
			this.props.navigator.push({
				screen: 'survey.Start',
				title: 'SUS Instructions',
				passProps: {
					participantName: this.state.id,
					productName: this.props.productName,
					notes: this.state.notes
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

	/**************************************************************************
	 * render
	 *************************************************************************/

	render () {
		return (
			<View style = { styles.container }>
				<View style = { styles.content }>
					<InputScrollView style = { styles.paddedContainer }>
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
							returnKeyLabel = { 'done' }
							returnKeyType = { 'done' }
							blurOnSubmit = { true }
							value = { this.state.notes }
							placeholder = 'ex: Stopped two times during this experiment.'
							inputRef = { 
								(input) => { this.descInput = input; }
							}
						/>
					</InputScrollView>
				</View>
				<View style = { styles.footer }>
					<TouchableBox
						onPress = { this._handleContinue }
						disabled = { false }
						style = {[ styles.touchFull, { opacity : this.state.id === '' ? 0.5 : 1}]}
						textStyle = { { color: 'white' } }
						text = 'Continue'
					/>
				</View>
			</View>
		);
	}

}

export default NewParticipant;