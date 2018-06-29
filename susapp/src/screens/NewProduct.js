
import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import InputScrollView from 'react-native-input-scroll-view';

import { common, colors, navigator } from '../global';
import AppService from '../AppService';
import TextInput from '../components/TextInput';
import TouchableBox from '../components/TouchableBox';

const styles = StyleSheet.create(common);

class NewProduct extends Component {

	constructor(props) {
		super(props);
		this.state = { name: '', desc: '', product: undefined, system: '' };
		this.systemInput = null;
		this.descInput = null;
	}

	/**************************************************************************
	 * event handlers
	 *************************************************************************/

	_handleCreate = () => {
		
		if (this.state.system === '') this.state.system = 'system';
		
		var res = AppService.addProduct(this.state.name, 
										this.state.desc, 
										this.state.system);

		this.setState({ product: res });

		if (res == -1) {
			Alert.alert(
				'Error', 
				'A product with this name already exists.', 
				[
					{text: "Ok, I'll rename.", onPress: () => {} }
				]);
		} else if (res == -2) {
			Alert.alert(
				'Error', 
				'A product must have a non-empty name.', 
				[
					{text: "Ok, I'll rename.", onPress: () => {} }
				]);
		} else {
			// Reset back to home screen
			this.props.navigator.resetTo({
				screen: 'screen.Home',
				title: 'Home',
				animated: true,
				navigatorStyle: navigator,
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

	/**************************************************************************
	 * render
	 *************************************************************************/

	render () {
		return (
			<View style = { styles.container }>
				<View style = { styles.content }>
					<InputScrollView style = { styles.paddedContainer }>
						<Text style = { styles.emphasis }>
							This is what you are collecting data for.
						</Text>
						<Text style = { styles.spaced }>Name of the Product:</Text>
						<TextInput 
							style = { styles.textField }
							onChangeText = { 
								(name) => this._handleChange({ name })
							}
							value = { this.state.name }
							returnKeyLabel = { "next" }
							returnKeyType = { "next" }
							placeholder = "Ex: iPhone X Notch"
							onSubmitEditing = { 
								(event) => this.systemInput.focus()
							}
						/>
						<Text style = { styles.spaced }>Use this word instead of 'system' in the SUS survey: 
							<Text style = {{ color: colors.lightGrey, fontStyle: 'italic' }}> (optional)</Text>
						</Text>
						<TextInput 
							style = { styles.textField }
							onChangeText = { 
								(system) => this._handleChange({ system }) 
							}
							value = { this.state.system }
							returnKeyLabel = { "next" }
							returnKeyType = { "next" }
							autoCapitalize = { "none" }
							placeholder = "Ex: phone"
							inputRef = { (input) => {
								this.systemInput = input;
							}}
							onSubmitEditing = { 
								(event) => this.descInput.focus()
							}
						/>
						<Text style = { styles.spaced }>Description:
							<Text style = {{ color: colors.lightGrey, fontStyle: 'italic' }}> (optional)</Text>
						</Text>
						<TextInput 
							style = {[ styles.textField, styles.multilineField ]}
							onChangeText = { 
								(desc) => this._handleChange({ desc }) 
							}
							multiline = { true }
							returnKeyLabel = { "done" }
							returnKeyType = { "done" }
							blurOnSubmit = { true }
							value = { this.state.desc }
							placeholder = "Ex: Testing on college students in portrait mode"
							inputRef = { 
								(input) => { this.descInput = input; }
							}
						/>
					</InputScrollView>
				</View>
				<View style = { styles.footer }>
					<TouchableBox
						onPress = { this._handleCreate }
						disabled = { false }
						style = {[ styles.touchFull, { opacity : this.state.name === '' ? 0.5 : 1}]}
						textStyle = { {  color: "white" } }
						text = "Create"
					/>
				</View>
			</View>
		);
	}
}

export default NewProduct;