import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { common, darkBlue } from '../../global';
import AppService from '../../AppService';
import TouchableBox from '../../components/TouchableBox';
import AnimatedBar from "react-native-animated-bar";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const specific = {
	prompt: {
		flex: 1,
		margin: 15,
		fontSize: 18,
		fontWeight: '600',
		height: 40,
	},
	form: {
		flex: 3,
		flexDirection: 'column',
		margin: 15,
	},
	hbuttons: {
		flex: 1,
		flexDirection: 'row',
        justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	label: {
		flex: 1,
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 15,
	}
};

const styles = StyleSheet.create(Object.assign({}, common, specific));

const radio_props = [
  	{label: '1', value: 1 },
  	{label: '2', value: 2 },
  	{label: '3', value: 3 },
  	{label: '4', value: 4 },
  	{label: '5', value: 5 },
];

export default class Question extends Component {

	constructor(props) {
		super(props);
		this.state = { qid: 0, value: 0, progress: 0.1, };
		this.response = Array.apply(null, Array(10)).map(Number.prototype.valueOf,0);

		let product = AppService.getProduct(this.props.productName);
		let systemName = product.system;

		this.questions = [ "I think that I would like to use this " + systemName + " frequently.",
						   "I found the " + systemName + " unnecessarily complex.",
						   "I thought the " + systemName + " was easy to use.",
						   "I think that I would need the support of a technical person to be able to use this " + systemName + ".",
						   "I found the various functions in this " + systemName + " were well integrated.",
						   "I thought there was too much inconsistency in this " + systemName + ".",
						   "I would imagine that most people would learn to use this " + systemName + " very quickly.",
						   "I found the " + systemName + " very awkward to use.",
						   "I felt very confident using the " + systemName + ".",
						   "I needed to learn a lot of things before I could get going with this " + systemName + "."
						 ];
	}

	_handleNext = () => {
		console.log(this.state.qid, this.state.value);
		this.response[this.state.qid] = this.state.value;

		this.setState(prev => {
			return { qid: prev.qid + 1, 
					 value: 0, 
					 progress: this.state.progress + 0.1 };
		});
	}

	_handlePrev = () => {
		this.setState(prev => {
			return { qid: prev.qid - 1, 
					 value : 0, 
					 progress: this.state.progress - 0.1 };
		});
	}

	_handleFinish = () => {
		this.response[this.state.qid] = this.state.value;
		this.props.navigator.push({
			screen: 'survey.Finish',
			title: 'SUS Survey',
			animated: true,
			passProps: {
				participantName: this.props.participantName,
				productName: this.props.productName,
				response: this.response,
				notes: this.props.notes
			},
			backButtonHidden: true
		});
	}

	renderPrev() {
		if (this.state.qid > 0) {
			return (
				<TouchableBox
					onPress = { this._handlePrev }
					disabled = { false }
					style = { styles.touchHalf }
					textStyle = { { color: "white" } }
					text = "Back"
				/>
			);
		} else {
			return (
				<TouchableBox
					onPress = { () => {} }
					disabled = { true }
					style = {[ styles.touchHalf, { opacity: 0.5 }]}
					textStyle = { { color: "white" } }
					text = "Back"
				/>
			);
		}
		return null;
	}

	renderNext() {
		// Save survey results
		if (this.state.qid < this.questions.length - 1) {
			if (this.state.value === 0) {
				return (
					<TouchableBox
						onPress = { () => {} }
						disabled = { true }
						style = {[ styles.touchHalf, { opacity: 0.5 }]}
						textStyle = { { color: "white" } }
						text = "Next"
					/>
				);
			}
			return (
				<TouchableBox
					onPress = { this._handleNext }
					disabled = { false }
					style = { styles.touchHalf }
					textStyle = { { color: "white" } }
					text = "Next"
				/>
			);
		}
		return null;
	}

	renderFinish() {
		if (this.state.qid === this.questions.length - 1) {
			if (this.state.value === 0) {
				return (
					<TouchableBox
						onPress = { () => {} }
						disabled = { true }
						style = {[ styles.touchHalf, { opacity: 0.5 }]}
						textStyle = { { color: "white" } }
						text = "Finish"
					/>
				);
			}
			return (
				<TouchableBox
					onPress = { this._handleFinish }
					disabled = { false }
					style = { styles.touchHalf }
					textStyle = { {color: "white"} }
					text = "Finish"
				/>
			);
		}
		return null;
	}

	renderForm() {
		if (this.state.qid < this.questions.length) {
			return (
				<View>
					<RadioForm formHorizontal = { true } animation = { true } initial = { -1 } >
						{ radio_props.map((obj, i) => {
							return (
								<RadioButton labelHorizontal={false} key={i} >
									<RadioButtonInput
										obj = { obj }
										index = { i }
										isSelected = { this.state.value === obj.value }
										onPress = { 
											(value) => { this.setState({ value: value })} 
										}
										buttonInnerColor = { darkBlue }
										buttonOuterColor = { darkBlue }
										buttonSize = { 35 }
										buttonWrapStyle = {{ marginLeft: 3, 
															 marginRight: 12 }}
									/>
									<RadioButtonLabel
										obj = { obj }
										index = { i }
										labelStyle = {{ fontWeight: 'bold',
														color: '#727272', 
														marginTop: 5, 
														marginRight: 7 }}
										onPress = { 
											(value) => { this.setState({ value: value })}
										}
									/>
								</RadioButton>
							);
						}) }
					</RadioForm>
				</View>
			);
		}
	}


	render() {
		return (
			<View style = { styles.container }>
				<View style = { styles.form }>
					<Text style = { styles.prompt }>{ this.questions[this.state.qid] }</Text>
					<View style = {{ flex: 4 }}>
						<View style = { styles.label }>
							<Text style = {{ width: 80, fontSize: 16, color: '#727272', textAlign: 'left' }}>Strongly Disagree</Text>
							<Text style = {{ width: 80, fontSize: 16, color: '#727272', textAlign: 'right' }}>Strongly Agree</Text>
						</View>
						<View style = {{ flex: 4, alignItems: 'center', }}>
							{ this.renderForm() }
							<AnimatedBar
								progress = { this.state.progress }
								height = { 5 }
								barColor = { darkBlue }
								fillColor = "#E6F2FB"
								borderWidth = { 0 }
								animate = { true }
								style = {{ marginTop: 45, marginLeft: 15, marginRight: 15 }}
							/>
						</View>
					</View>
					
				</View>
				<View style = { styles.footer }>
					<View style = { styles.hbuttons }>
						{ this.renderPrev() }
						{ this.renderNext() }
						{ this.renderFinish() }
					</View>
				</View>
			</View>
		);
	}
}