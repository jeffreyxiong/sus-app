import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AppService from '../../AppService';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

let questions = ["Question 1", "Question 2", "Question 3", "Question 4"];
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
		this.state = {qid: 0, value: 0};
	}

	_handleNext() {
		AppService.addScore(this.props.participantName, this.state.qid, this.state.value);
		
		this.setState(prev => {
			return {qid: prev.qid + 1};
		});
	}

	_handlePrev() {
		this.setState(prev => {
			return {qid: prev.qid - 1};
		});
	}

	_handleFinish() {
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
		return (
			<View>
				<View>
					<Text> {questions[this.state.qid]} </Text>
					<View>
				        <RadioForm
				        	formHorizontal={true}
				        	labelHorizontal={false}
				          	radio_props={radio_props}
				          	initial={0}
				          	onPress={(value) => {this.setState({value:value})}}
				        />
				    </View>
				    { this.renderPrev() }
					{ this.renderNext() }
					{ this.renderFinish() }
				</View>
			</View>
		);
	}
}

export default SurveyQuestion;