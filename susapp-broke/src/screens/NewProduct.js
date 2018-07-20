// @flow

import React, { Component } from 'react';
import { View, Text, Alert, Platform, StyleSheet } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import { common, colors } from '../global';
import AppService from '../model/AppService';
import TextInput from '../components/TextInput';
// import TouchableBox from '../components/TouchableBox';
import AddProduct from '../containers/AddProduct';

const styles = StyleSheet.create(common);

export default class NewProduct extends Component {

	static navigationOptions = () => ({
		title: "Add a New Product",
	});

	constructor(props) {
		super(props);
		this.state = { name: '', desc: '', product: undefined, system: '', textareaHeight: null, };
		this.systemInput = null;
		this.descInput = null;
	}

	/**************************************************************************
	 * event handlers
	 *************************************************************************/

	_handleCreate = (callback) => {
		
		if (this.state.system === '') this.state.system = 'system';
		
		var res = AppService.addProduct(this.state.name, this.state.desc, this.state.system);

		this.setState({ product: res });

		if (res == -1) {
			Alert.alert(
				'Error', 
				'A product with this name already exists.', 
				[
					{text: "Ok, I'll rename.", onPress: () => {} }
				]);
			this.state.system = '';
		} else if (res == -2) {
			Alert.alert(
				'Error', 
				'A product must have a non-empty name.', 
				[
					{text: "Ok, I'll rename.", onPress: () => {} }
				]);
			this.state.system = '';
		} else {
			// Reset back to home screen
			callback();
			this.props.navigation.pop();
		}
	}

	_handleChange = (text) => {
		this.setState(text);
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
					<InputScrollView style = { styles.paddedContainer } multilineInputStyle = {{ lineHeight: 2, }}>
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
							style = {[ styles.textField, styles.multilineField, { height: this.state.textareaHeight }]}
							onChangeText = { 
								(desc) => this._handleChange({ desc }) 
							}
							multiline = { true }
							numberOfLines = { 2 }
							returnKeyLabel = { "done" }
							returnKeyType = { "done" }
							blurOnSubmit = { true }
							value = { this.state.desc }
							placeholder = "Ex: Testing on college students in portrait mode"
							onContentSizeChange={ this._onContentSizeChange }
							inputRef = { 
								(input) => { this.descInput = input; }
							}
						/>
					</InputScrollView>
				</View>
				<View style = { styles.footer }>
					<AddProduct create = { this._handleCreate } />
				</View>
			</View>
		);
	}
}