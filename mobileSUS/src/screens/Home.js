// Home.js

// Home describes the initial screen
// + Start new study
// + List existing studies

import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import AppService from '../AppService';
import BoxScrollView from  '../components/BoxScrollView';
import TouchableBox from '../components/TouchableBox';

const styles = StyleSheet.create({
	main: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	start: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: 15,
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
		justifyContent: 'center',
	},
	text: {
		fontSize: 12, 
		color: '#727272',
	},
});

class Home extends Component {

	_handleNewStudy = () => {
		this.props.navigator.push({
			screen: 'mobilesus.NewStudy',
			title: 'Add a New Product',
			backButtonTitle: ""
		});
	}

	_handleOpenStudy = (study) => {
		this.props.navigator.push({
			screen: 'mobilesus.Study',
			title: study.name,
			backButtonTitle: "",
			passProps: {
				studyName: study.name,
				studyDescription: study.description
			}
		});
	}

	renderStudies() {
		let studies = AppService.getStudies();

		return studies.map((study, i) => {
			return (
				<TouchableBox 
					key = { i }
					onPress = { () => this._handleOpenStudy(study) }
					disabled = { false }
					style = { { width: 300, height: 80, backgroundColor: "#E6F2FB", borderRadius: 10 } }
					textStyle = { { color: "black" } }
					text = { study.name }
				/>
			);
		});
	}

	render() {
		// Get all existing studies
		let studies = AppService.getStudies();

		var existing;
		if (studies.length != 0) {
			existing = 	<BoxScrollView 	style = { styles.existing }
										titleStyle = {[ styles.text, { margin: 5 } ]}
										title = "Existing Products">
								{ this.renderStudies() }
						</BoxScrollView>
		} else {
			existing = 	<View style = { styles.nonexisting }> 
							<Text style = { styles.text }> No Existing Studies </Text> 
						</View>
		}

		return (
				<View style = {[ styles.main, { backgroundColor: "white" } ]}>
					{ existing }
					<View style = { styles.start }>
						<TouchableBox
							onPress = { this._handleNewStudy }
							disabled = { false }
							style = { { width: 300, height: 80, backgroundColor: "#69A6D7" } }
							textStyle = { { color: "white" } }
							text = "Add a New Product"
						/>
					</View>
					
				</View>

			);
	}
}

export default Home;