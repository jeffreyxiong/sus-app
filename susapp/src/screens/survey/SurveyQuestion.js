import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { common, colors, dims } from '../../global';
import AppService from '../../AppService';
import TouchableBox from '../../components/TouchableBox';
import AnimatedBar from 'react-native-animated-bar';
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
	labelWrap: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	buttonWrap: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	label: {
		width: 80, 
		fontSize: 16, 
		color: colors.lightGrey,
	},
};
const styles = StyleSheet.create(Object.assign({}, common, specific));

const radio_props = [
  	{label: '1', value: 1 },
  	{label: '2', value: 2 },
  	{label: '3', value: 3 },
  	{label: '4', value: 4 },
  	{label: '5', value: 5 },
];

const {height, width} = Dimensions.get('window');

export default class Question extends Component {

	constructor(props) {
		super(props);
		this.state = { qid: 0, value: 0, progress: 0.1, };
		this.response = Array.apply(null, Array(10)).map(Number.prototype.valueOf,0);

		let product = AppService.getProduct(this.props.productName);
		let systemName = product.system;
	}

	questions = [ 
		'I think that I would like to use this ' + this.systemName + ' frequently.',
		'I found the ' + this.systemName + ' unnecessarily complex.',
		'I thought the ' + this.systemName + ' was easy to use.',
		'I think that I would need the support of a technical person to be able to use this ' + this.systemName + '.',
		'I found the various functions in this ' + this.systemName + ' were well integrated.',
		'I thought there was too much inconsistency in this ' + this.systemName + '.',
		'I would imagine that most people would learn to use this ' + this.systemName + ' very quickly.',
		'I found the ' + this.systemName + ' very awkward to use.',
		'I felt very confident using the ' + this.systemName + '.',
		'I needed to learn a lot of things before I could get going with this ' + this.systemName + '.' 
	];

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

	_renderBox = (text, callback, disabled) => {
		var opacity = disabled ? 0.5 : 1;
		var dir = text === 'Prev' ? { marginRight: 5 } : { marginLeft: 5 };
		return (
			<TouchableBox
				onPress = { callback }
				disabled = { disabled }
				style = {[ styles.touchHalf, { opacity: opacity }, dir ]}
				text = { text }
				textStyle = {{ color: 'white' }}
			/>
		);
	}

	_renderPrev() {
		if (this.state.qid > 0) {
			return this._renderBox('Back', this._handlePrev, false);
		} else {
			return this._renderBox('Back', () => {}, true);
		}
		return null;
	}

	_renderNext() {
		// Save survey results
		if (this.state.qid < this.questions.length - 1) {
			if (this.state.value === 0) {
				return this._renderBox('Next', () => {}, true);
			}
			return this._renderBox('Next', this._handleNext, false);
		}
		return null;
	}

	_renderFinish() {
		if (this.state.qid === this.questions.length - 1) {
			if (this.state.value === 0) {
				return this._renderBox('Finish', () => {}, true);
			}
			return this._renderBox('Finish', this._handleFinish, false);
		}
		return null;
	}

	_renderForm() {
		// if (this.state.qid < this.questions.length) {
			return (
				<View style = {{ flex: 2 }}>
					<RadioForm formHorizontal = { true } animation = { true } initial = { -1 } style = { styles.buttonWrap }>
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
										buttonInnerColor = { colors.darkBlue }
										buttonOuterColor = { colors.darkBlue }
										buttonSize = { width / 9 }
									/>
									<RadioButtonLabel
										obj = { obj }
										index = { i }
										labelStyle = {{ fontWeight: 'bold',
														color: colors.lightGrey, 
														marginTop: 5,
														}}
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
		// }
	}


	render() {
		return (
			<View style = { styles.container }>
				<View style = { styles.content }>
					<View style = { styles.paddedContainer }>
						<Text style = {[ styles.emphasis, { flex: 1, }]}>{ this.questions[this.state.qid] }</Text>
						<View style = {{ flex: 4, flexDirection: 'column', justifyContent: 'space-around', }}>
							<View style = {[ styles.labelWrap, { alignItems: 'flex-start', }]}>
								<Text style = {[ styles.label, { textAlign: 'left' }]}>Strongly Disagree</Text>
								<Text style = {[ styles.label, { textAlign: 'right' }]}>Strongly Agree</Text>
							</View>
							{ this._renderForm() }
							<View style = {{ flex: 1, justifyContent: 'flex-start', }}>
								<AnimatedBar
									progress = { this.state.progress }
									height = { 5 }
									barColor = { colors.darkBlue }
									fillColor = { colors.lightBlue }
									borderWidth = { 0 }
									animate = { true }
								/>
							</View>
						</View>
					</View>
				</View>
				<View style = { styles.footer }>
					<View style = { styles.hbuttons }>
						{ this._renderPrev() }
						{ this._renderNext() }
						{ this._renderFinish() }
					</View>
				</View>
			</View>


			// <View style = { styles.container }>
			// 	<View style = { styles.form }>
			// 		<Text style = { styles.prompt }>{ this.questions[this.state.qid] }</Text>
			// 		<View style = {{ flex: 4 }}>
			// 			<View style = { styles.label }>
			// 				<Text style = {{ width: 80, fontSize: 16, color: colors.lightGrey, textAlign: 'left' }}>Strongly Disagree</Text>
			// 				<Text style = {{ width: 80, fontSize: 16, color: colors.lightGrey, textAlign: 'right' }}>Strongly Agree</Text>
			// 			</View>
			// 			<View style = {{ flex: 4, alignItems: 'center', }}>
			// 				{ this._renderForm() }
			// 				<AnimatedBar
			// 					progress = { this.state.progress }
			// 					height = { 5 }
			// 					barColor = { colors.darkBlue }
			// 					fillColor = { colors.lightBlue }
			// 					borderWidth = { 0 }
			// 					animate = { true }
			// 					style = {{ marginTop: 45, marginLeft: 15, marginRight: 15 }}
			// 				/>
			// 			</View>
			// 		</View>
					
			// 	</View>
			// 	<View style = { styles.footer }>
			// 		<View style = { styles.hbuttons }>
			// 			{ this._renderPrev() }
			// 			{ this._renderNext() }
			// 			{ this._renderFinish() }
			// 		</View>
			// 	</View>
			// </View>
		);
	}
}