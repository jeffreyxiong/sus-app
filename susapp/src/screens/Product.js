import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import { common, colors, navigator } from '../global';
import AppService from '../AppService';
import TouchableBox from '../components/TouchableBox';
import SliderView from '../components/SliderView';

const styles = StyleSheet.create(common);

class Product extends Component {

	static navigatorButtons = {
		rightButtons: [
			{
				// todo: change systemItem for Android
				disableIconTint: true,
				id: 'delete',
				systemItem: 'trash',
			}
		]
	};

	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	onNavigatorEvent(event) {
		if (event.type == 'NavBarButtonPress') {
		  	if (event.id == 'delete') {
				this._handleDelete();
		  	}
		}
	}

	_handleAddParticipant = () => {
		this.props.navigator.push({
			screen: 'screen.NewParticipant',
			title: this.props.productName,
			animated: true,
			backButtonTitle: '',
			passProps: {
				productName: this.props.productName
			}
		});
	}

	_handleEmail = () => {
		this.props.navigator.push({
			screen: 'screen.Email',
			title: 'Email \'' + this.props.productName + '\' Data',
			animate: true,
			backButtonTitle: '',
			passProps: {
				productName: this.props.productName,
			}
		})
	}

	_handleDelete = () => {
		Alert.alert(
			'Delete ' + this.props.productName,
			'Are you sure you want to delete this product? Your data will not be recoverable.',
			[
				{text: 'Ok', onPress: () => this._handleDeleteConfirm()},
				{text: 'Cancel', onPress: () => {} },
			]
		)
		
	}

	_handleDeleteConfirm = () => {
		AppService.removeProduct(this.props.productName);
		this.props.navigator.resetTo({
			screen: 'screen.Home',
			title: 'Home',
			animated: true,
			navigatorStyle: navigator,
		});
	}

	render() {
		dataSet = AppService.getStat(this.props.productName)
		return (
			<View style={ styles.container }>
				<SliderView
					description = { this.props.productDesc }
					count = { dataSet.size }
					mean = { dataSet.mean }
					std = { dataSet.std }
					max = { dataSet.max }
					min = { dataSet.min }
				/>
				<View style={ styles.footer }>
					<TouchableBox 
						onPress = { this._handleAddParticipant }
						disabled = { false }
						style = { styles.touchFull }
						textStyle = { { color: 'white' } }
						text = 'Add a New Participant'
					/>
					<TouchableBox
						onPress = { this._handleEmail }
						disabled = { false }
						style = { styles.touchFull }
						textStyle = { { color: 'white' } }
						text = 'Email Product Data'
					/>
					
				</View>
			</View>
		);
	}
}

export default Product;