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

class Study extends Component {
	constructor(props) {
		super(props);
	}

	handleAddParticipant = () => {
		this.props.navigator.push({
			screen: 'mobilesus.ParticipantStart',
			title: this.props.studyName,
			animated: true,
			backButtonHidden: true,
			passProps: {
				studyName: this.props.studyName
			}
		});
	}

	handleViewData = () => {
		this.props.navigator.push({
			screen: 'mobilesus.DataView',
			title: this.props.studyName + ' Data',
			animated: true,
			backButtonTitle: "Back",
			passProps: {
				studyName: this.props.studyName,
			}
		});
	}

	handleEmail = () => {
		console.log("Email");
		AppService.exportStudy(this.props.studyName);
	}

	handleDelete = () => {
		Alert.alert(
		  'Delete ' + this.props.studyName,
		  'Are you sure you want to delete this study?',
		  [
		    {text: 'Ok', onPress: () => this.handleDeleteConfirm()},
		    {text: 'Cancel', onPress: () => {} },
		  ]
		)
		
	}

	handleDeleteConfirm = () => {
		AppService.removeStudy(this.props.studyName);
		this.props.navigator.resetTo({
			screen: 'mobilesus.Home',
			title: 'SUS App',
			animated: true
		});
	}

	render() {
		return (
			<View style={styles.home}>
				<View style={styles.bottom}>
					<TouchableBox 
						onPress = { () => this.handleAddParticipant() }
						backgroundColor = {{backgroundColor: "#D3D3D3"}}
						text = "Add a New Participant"
						textColor = {{color: "#000"}}
					/>
					<TouchableBox 
						onPress = { () => this.handleViewData() }
						backgroundColor = {{backgroundColor: "#D3D3D3"}}
						text = "View Your Study's Data"
						textColor = {{color: "#000"}}
					/>
					<TouchableBox 
						onPress = { () => this.handleEmail() }
						backgroundColor = {{backgroundColor: "#D3D3D3"}}
						text = "Email Your Study's Data"
						textColor = {{color: "#000"}}
					/>
					<TouchableBox 
						onPress = { () => this.handleDelete() }
						backgroundColor = {{backgroundColor: "red"}}
						text = "Delete Study and Data"
						textColor = {{color: "#000"}}
					/>
				</View>
			</View>
		);
	}
}

export default Study;