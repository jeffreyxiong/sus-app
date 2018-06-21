import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage, Alert } from 'react-native';
import AppService from '../AppService';
import TouchableBox from '../components/TouchableBox';
import { CheckBox } from 'react-native-elements';

const styles = StyleSheet.create({
	main: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	form: {
		flex: 3
	},
	checkbox: {
		margin: 15,
	},
	textField: {
		margin: 15,
		borderColor: '#979797', 
		borderWidth: 1,
		borderRadius: 10,
		padding: 15,
		fontSize: 14
	},
	prompt: {
		margin: 15,
		fontSize: 16,
		fontWeight: '600'
	},
	question: {
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		fontSize: 16
	},
	section: {
		marginTop: 10
	},
	buttons: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: 15,
	}
});

export default class Info extends Component {

    constructor(props) {
		super(props);
    }

    render() {
		return (
			<View style = { styles.main }>
				<View style = { styles.form }>
					<View style = { styles.section }>
						<Text style = { styles.question }>This app was created by the Rice University Human Factors Research Lab. </Text>
						<Text style = { styles.question }>Designed and developed by Jeffrey Xiong. Guidance provided by Dr. Philip Kortum and Dr. Claudia Ziegler Acemyan. </Text>
						<Text style = { styles.question }>Special thanks to John Brooke, who created the System Usability Scale (1996). </Text>
					</View>
				</View>
			</View>
		);
	}
}