// Home.js

// Home describes the initial screen
// + Start new study
// + List existing studies

import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
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
	start: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	existing: {
		flex: 3,
		alignItems: 'center',
		alignContent: 'flex-start',
		justifyContent: 'center',
		marginTop: 15,
		marginBottom: 15
	},
	nonexisting: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center'
	},
	existingText: {
		marginBottom: 5
	},
});

class Home extends Component {

	handleNewStudy = () => {
		this.props.navigator.push({
			screen: 'mobilesus.NewStudyName',
			title: 'Create a New Study',
			backButtonHidden: true
		});
	}

	handleOpenStudy = (study) => {
		this.props.navigator.push({
			screen: 'mobilesus.Study',
			title: study.name,
			backButtonTitle: "Back",
			passProps: {
				studyName: study.name
			}
		});
	}

	renderStudies() {
		let studies = AppService.getStudies();

		return studies.map((study, i) => {
			return (
				<TouchableBox 
					key = {i}
					onPress = { () => this.handleOpenStudy(study) }
					backgroundColor = {{backgroundColor: "white"}}
					text = {study.name}
					textColor = {{color: "#000"}}
				/>
			);
		});
	}

	render() {
		// Get all existing studies
		let studies = AppService.getStudies();

		var existing;
		if (studies.length != 0) {
			existing = 	<BoxScrollView outerStyle = {styles.existing} text = "Existing Studies">
							{this.renderStudies()}
						</BoxScrollView>
		} else {
			existing = 	<View style = {styles.nonexisting}> 
							<Text> No Existing Studies </Text> 
						</View>
		}

		return (
				<View style = {[styles.home, {backgroundColor: "#F2F2F2"}]}>
					{existing}
					<View style = {styles.start}>
						<TouchableBox
							onPress = {this.handleNewStudy}
							text = "Start a New Study"
							backgroundColor = {{backgroundColor: "blue"}}
							textColor = {{color: "white"}}
						/>
					</View>
					
				</View>

			);
	}
}

export default Home;