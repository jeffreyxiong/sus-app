import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import AppService from '../AppService';
import BoxScrollView from  '../components/BoxScrollView';
import TouchableBox from '../components/TouchableBox';

const styles = StyleSheet.create({
	existing: {
		flex: 3,
		alignItems: 'center',
		alignContent: 'flex-start',
		justifyContent: 'center',
		marginBottom: 15
	}
});

class Study extends Component {
	constructor(props) {
		super(props);
	}

	handleOpenSystem = (system) => {
		
	}

	parseSystemName = (name) => {
		return name.substring(name.indexOf(".") + 1, name.length);
	}

	renderSystems() {
		let study = AppService.getStudy(this.props.studyName);
		let systems = study.systems;

		return systems.map((system, i) => {
			console.log(this.parseSystemName(system.name));
			return (
				<TouchableBox 
					key = {i}
					onPress = { () => this.handleOpenSystem(system) }
					backgroundColor = {{backgroundColor: "white"}}
					text = {this.parseSystemName(system.name)}
					textColor = {{color: "#000"}}
				/>
			);
		});
	}

	render() {
		return (
			<BoxScrollView outerStyle = {styles.existing} text = "Collect Data">
				{this.renderSystems()}
			</BoxScrollView>
		);
	}
}

export default Study;