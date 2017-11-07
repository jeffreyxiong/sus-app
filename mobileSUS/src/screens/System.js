import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AppService from '../AppService';
import BoxScrollView from  '../components/BoxScrollView';
import TouchableBox from '../components/TouchableBox';

const styles = StyleSheet.create({
	home: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	existing: {
		flex: 1,
		alignItems: 'center',
		alignContent: 'flex-start',
		justifyContent: 'center',
		marginTop: 15,
		marginBottom: 10
	},
	bottom: {
		marginBottom: 15
	}
});

class System extends Component {
	constructor(props) {
		super(props);
	}

	handleEmail = () => {
		console.log("Email");
		AppService.exportSystem(this.props.systemName);
	}

	handleAddParticipant = () => {
		this.props.navigator.push({
			screen: 'mobilesus.ParticipantStart',
			title: AppService.parseAppendedName(this.props.systemName),
			animated: true,
			backButtonHidden: true,
			passProps: {
				studyName: this.props.studyName,
				systemName: this.props.systemName
			}
		});
	}

	handleDelete = () => {
		Alert.alert(
		  'Delete ' + this.props.systemName,
		  'Are you sure you want to delete this system?',
		  [
		    {text: 'Ok', onPress: () => this.handleDeleteConfirm()},
		    {text: 'Cancel', onPress: () => {} },
		  ]
		)
		
	}

	handleDeleteConfirm = () => {
		AppService.removeSystem(this.props.systemName);
		this.props.navigator.resetTo({
			screen: 'mobilesus.Home',
			title: 'SUS App',
			animated: true
		});
	}

	handleViewData = () => {
		this.props.navigator.push({
			screen: 'mobilesus.DataView',
			title: AppService.parseAppendedName(this.props.systemName) + ' Data',
			animated: true,
			backButtonTitle: "Back",
			passProps: {
				studyName: this.props.studyName,
				systemName: this.props.systemName
			}
		});
	}

	render() {
		return (
			<View style={styles.home}>
				<View style={styles.bottom}>
					<TouchableBox 
						onPress = { () => this.handleViewData() }
						backgroundColor = {{backgroundColor: "#D3D3D3"}}
						text = "View Data"
						textColor = {{color: "#000"}}
					/>
					<TouchableBox 
						onPress = { () => this.handleAddParticipant() }
						backgroundColor = {{backgroundColor: "#D3D3D3"}}
						text = "Add Participant"
						textColor = {{color: "#000"}}
					/>
					<TouchableBox 
						onPress = { () => this.handleEmail() }
						backgroundColor = {{backgroundColor: "#D3D3D3"}}
						text = "Email System Data"
						textColor = {{color: "#000"}}
					/>
					<TouchableBox 
						onPress = { () => this.handleDelete() }
						backgroundColor = {{backgroundColor: "red"}}
						text = "Delete System and Data"
						textColor = {{color: "#000"}}
					/>
				</View>
			</View>
		);
	}
}

export default System;