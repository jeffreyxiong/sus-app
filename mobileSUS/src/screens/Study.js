import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AppService from '../AppService';
import BoxScrollView from  '../components/BoxScrollView';
import TouchableBox from '../components/TouchableBox';
import SliderView from '../components/SliderView';

const styles = StyleSheet.create({
	home: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	bottom: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 15
	}
});

class Study extends Component {

	static navigatorButtons = {
		rightButtons: [
			{
				icon: require('../../assets/delete.png'),
				disableIconTint: true,
				id: 'delete',
			}
		]
	  };

	constructor(props) {
		super(props);

		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	onNavigatorEvent(event) {
		if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
		  	if (event.id == 'delete') { // this is the same id field from the static navigatorButtons definition
				this._handleDelete();
		  	}
		}
	}

	_handleAddParticipant = () => {
		this.props.navigator.push({
			screen: 'mobilesus.ParticipantStart',
			title: this.props.studyName,
			animated: true,
			backButtonTitle: "",
			passProps: {
				studyName: this.props.studyName
			}
		});
	}

	_handleEmail = () => {
		this.props.navigator.push({
			screen: 'mobilesus.Email',
			title: 'Email ' + this.props.studyName + ' Data',
			animate: true,
			backButtonTitle: "",
			passProps: {
				studyName: this.props.studyName
			}
		})
	}

	_handleDelete = () => {
		Alert.alert(
		  'Delete ' + this.props.studyName,
		  'Are you sure you want to delete this product?',
		  [
		    {text: 'Ok', onPress: () => this._handleDeleteConfirm()},
		    {text: 'Cancel', onPress: () => {} },
		  ]
		)
		
	}

	_handleDeleteConfirm = () => {
		AppService.removeStudy(this.props.studyName);
		this.props.navigator.resetTo({
			screen: 'mobilesus.Home',
			title: 'SUS App',
			animated: true
		});
	}

	render() {
		dataSet = AppService.getStat(this.props.studyName)
		return (
			<View style={ styles.home }>
				<SliderView
					description = { this.props.studyDescription }
					count = { dataSet.size }
					mean = { dataSet.mean }
					std = { dataSet.std }
					max = { dataSet.max }
					min = { dataSet.min }
				/>
				<View style={ styles.bottom }>
					<TouchableBox
						onPress = { this._handleEmail }
						disabled = { false }
						style = { { width: 300, height: 80, backgroundColor: "#69A6D7" } }
						textStyle = { { color: "white" } }
						text = "Email Product Data"
					/>
					<TouchableBox 
						onPress = { this._handleAddParticipant }
						disabled = { false }
						style = { { width: 300, height: 80, backgroundColor: "#69A6D7" } }
						textStyle = { { color: "white" } }
						text = "Add a New Participant"
					/>
				</View>
			</View>
		);
	}
}

export default Study;