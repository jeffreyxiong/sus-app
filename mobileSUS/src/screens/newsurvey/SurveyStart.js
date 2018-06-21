import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TouchableBox from '../../components/TouchableBox';

const styles = StyleSheet.create({
	main: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	instructions: {
		flex: 1,
		margin: 15,
	},
	buttons: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: 15,
	},
	columnText: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between'
	},
	prompt: {
		margin: 15,
		fontSize: 18,
		fontWeight: '600'
	},
	text: {
		fontSize: 18,
		flex: 1, 
		paddingLeft: 15,
	},
	bullet: {
		flexDirection: 'row',
		marginLeft: 10,
		marginBottom: 15,
	}
});

export default class SurveyStart extends Component {

	constructor(props) {
		super(props);
	}

	_handleStart = () => {
		this.props.navigator.resetTo({
			screen: 'mobilesus.SurveyQuestion',
			title: 'SUS Survey',
			animated: true,
			passProps: {
				participantName: this.props.participantName,
				studyName: this.props.studyName,
				notes: this.props.notes
			}
		});
	}

	render() {
		return (
			<View style = { styles.main }>
				<View>
					<Text style = { styles.prompt }>For each of the following questions:</Text>
				</View>
				<View style = { styles.instructions }>
					<View style = { styles.bullet }>
						<Text style = { { fontSize: 18 } }>{ '\u2022' }</Text>
						<Text style = { styles.text }>Keep in mind the system you just used.</Text>
					</View>
					<View style = { styles.bullet }>
						<Text style = { { fontSize: 18 } }>{ '\u2022' }</Text>
						<Text style = { styles.text }>Reflect your immediate response to each statement.</Text>
					</View>
					<View style = { styles.bullet }>
						<Text style = { { fontSize: 18 } }>{ '\u2022' }</Text>
						<Text style = { styles.text }>Don't think too long on each one.</Text>
					</View>
					<View style = { styles.bullet }>
						<Text style = { { fontSize: 18 } }>{ '\u2022' }</Text>
						<Text style = { styles.text }>Make sure you respond to each statement.</Text>
					</View>
				</View>
				<View style = { styles.buttons }>
					<TouchableBox
						onPress = { this._handleStart }
						disabled = { false }
						style = { { width: 300, height: 80, backgroundColor: "#69A6D7" } }
						textStyle = { { color: "white" } }
						text = "Start"
					/>
				</View>
			</View>
		);
	}
}