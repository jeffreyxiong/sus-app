import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AppService from '../../AppService';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const styles = StyleSheet.create({
	instructions: {
		flex: 1,
		marginTop: 15,
		marginLeft: 15,
		marginBottom: 30
	},
	form: {
		flex: 1,
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 30
	},
	buttons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 15
	},
	home: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	text: {
		fontSize: 18
	}
});

let questions = ["I think that I would like to use this system frequently.",
				 "I found the system unnecessarily complex.",
				 "I thought the system was easy to use.",
				 "I think that I would need the support of a technical person to be able to use this system.",
				 "I found the various functions in this system were well integrated.",
				 "I thought there was too much inconsistency in this system.",
				 "I would imagine that most people would learn to use this system very quickly.",
				 "I found the system very cumbersome to use.",
				 "I felt very confident using the system.",
				 "I needed to learn a lot of things before I could get going with this system."];
var radio_props = [
  {label: '1', value: 1 },
  {label: '2', value: 2 },
  {label: '3', value: 3 },
  {label: '4', value: 4 },
  {label: '5', value: 5 },
];

class SurveyQuestion extends Component {

	constructor(props) {
		super(props);
		this.state = {qid: 0, value: 1};
	}

	_handleNext = () => {
		console.log(this.state.qid, this.state.value);
		AppService.addScore(this.props.participantID, this.state.qid, this.state.value);

		this.setState(prev => {
			return {qid: prev.qid + 1};
		});
	}

	_handlePrev = () => {
		this.setState(prev => {
			return {qid: prev.qid - 1};
		});
	}

	_handleFinish = () => {
		this.props.navigator.resetTo({
			screen: 'mobilesus.Home',
			title: 'SUS App',
			animated: true
		});
	}

	renderPrev() {
		if (this.state.qid > 0) {
			return (
				<Button 
					onPress = {() => this._handlePrev()}
					title = "Prev"
				/>
			);
		}
		return null;
	}

	renderNext() {
		// Save survey results
		if (this.state.qid < questions.length) {
			return (
				<Button 
					onPress = {() => this._handleNext()}
					title = "Next"
				/>
			);
		}
		return null;
	}

	renderFinish() {
		if (this.state.qid === questions.length) {
			return (
				<Button 
					onPress = {() => this._handleFinish()}
					title = "Finish"
				/>
			);
		}
		return null;
	}

	render() {
		const showButtons = this.state.qid < questions.length
		let form = null
		if (showButtons) {
			form = <RadioForm
			        	formHorizontal={true}
			        	labelHorizontal={false}
			          	radio_props={radio_props}
			          	initial={0}
			          	onPress={(value) => {this.setState({value:value})}}
			        />
		}
		return (
			<View>
				<View style = {styles.home}>
					<View style = {styles.instructions}>
						<Text style={styles.text}> {questions[this.state.qid]} </Text>
					</View>
					<View style = {styles.form}>
				        { form }
				    </View>
				    <View style = {styles.buttons}>
				   		{ this.renderPrev() }
						{ this.renderNext() }
						{ this.renderFinish() }
					</View>
				</View>
			</View>
		);
	}
}

export default SurveyQuestion;