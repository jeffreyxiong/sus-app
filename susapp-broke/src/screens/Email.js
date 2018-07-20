import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { common, colors, navigator, dims } from '../global';
import AppService from '../model/AppService';
import TouchableBox from '../components/TouchableBox';
import { CheckBox } from 'react-native-elements';

const styles = StyleSheet.create(common);

export default class Email extends Component {

	static navigationOptions = ({ navigation }) => ({
		title: 'Email ' + navigation.getParam('productName') + ' Data',
	});

    constructor(props) {
		super(props);
		this.productName = this.props.navigation.getParam('productName');
		var text = '';
		var check = false;
		var email = AppService.getEmail();
		if (email != null) {
			text = email.email;
			check = true;
		}
		this.state = { email: text, checked: check, animating: false };
	}

	_handleAlert = () => {
		// this.props.navigation.popToTop();
	}
	
	_handleContinue = () => {
		if(this.state.email === '') {
			Alert.alert(
				'Error', 
				'Please enter an email.', 
				[
					{text: "Ok, I'll enter my email.", onPress: () => {} }
				]);
		} else {
			if (this.state.checked) {
				console.log('checked');
				AppService.addEmail(this.state.email);
			} else {
				AppService.removeEmail();
			}

			this.setState({ animating: true });

			AppService.exportProduct(this.productName, this.state.email)
				.then(() => {
					this.setState({ animating: false });
					this.props.navigation.popToTop();
				})
				.catch((err) => {
					this.setState({ animating: false });
					this._handleAlert();
				});
		}		
	}

	_handleChange = (text) => {
		this.setState(text);
	}

    render() {
		return (
			<View style = { styles.container }>
				<View style = { styles.content }>
					<View style = { styles.paddedContainer }>
						<Text style = { styles.emphasis }>
							Product data will be emailed as a tab delimited file.
						</Text>
						<Text style = { styles.spaced }>Email Address:</Text>
						<TextInput 
							style = { styles.textField }
							onChangeText = { 
								(email) => this._handleChange({ email })
							}
							value = { this.state.email }
							keyboardType = { 'email-address' }
							returnKeyLabel = { "done" }
							returnKeyType = { "done" }
							autoCapitalize = 'none'
							placeholder = "Ex: phil@usableproducts.com"
						/>
						<Text style = { styles.spaced }>
							Do you want to remember this email?
						</Text>
						<CheckBox
							title='Yes'
							style={ styles.checkbox }
							checked={ this.state.checked }
							onPress={ 
								() => this.setState({ 
									checked: !this.state.checked 
								})
							}
						/>
					</View>
				</View>
				<View style = { styles.footer }>
					{ !this.state.animating && <TouchableBox
						onPress = { this._handleContinue }
						disabled = { false }
						style = {[ styles.touchFull, { opacity : this.state.email === '' ? 0.5 : 1}]}
						textStyle = {{  color: "white" }}
						text = "Send"
					/> }
					{ this.state.animating && <ActivityIndicator
						style = {{ marginBottom: dims.marginStandard }}
						color = { colors.darkBlue }
						size = 'large'
						animating = { this.state.animating }
					/> }
				</View>
			</View>
		);
	}
}