import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { common, colors, dims } from '../../global';
import TouchableBox from '../../components/TouchableBox';
import AnimatedBar from 'react-native-animated-bar';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { addScores } from '../../actions';
import { connect } from 'react-redux';

const specific = {
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
		paddingLeft: 0,
	},
	label: {
		width: 80, 
		fontSize: dims.textMedium, 
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

const width = Dimensions.get('window').width;

const mapStateToProps = state => ({
    system: state.product.system,
});

const mapDispatchToProps = dispatch => {
	return {
		addScores: (scores) => {
            dispatch(addScores(scores));
		},
	}
};

class Questions extends Component {

    static navigationOptions = () => ({
		title: "SUS Survey",
	});

	constructor(props) {
        super(props);

		this.state = { qid: 0, value: 0, progress: 0.1, };
		this.response = Array.apply(null, Array(10)).map(Number.prototype.valueOf,0);
	}

	questions = [ 
		'I think that I would like to use this ' + this.props.system + ' frequently.',
		'I found the ' + this.props.system + ' unnecessarily complex.',
		'I thought the ' + this.props.system + ' was easy to use.',
		'I think that I would need the support of a technical person to be able to use this ' + this.props.system + '.',
		'I found the various functions in this ' + this.props.system + ' were well integrated.',
		'I thought there was too much inconsistency in this ' + this.props.system + '.',
		'I would imagine that most people would learn to use this ' + this.props.system + ' very quickly.',
		'I found the ' + this.props.system + ' very awkward to use.',
		'I felt very confident using the ' + this.props.system + '.',
		'I needed to learn a lot of things before I could get going with this ' + this.props.system + '.' 
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
        this.props.addScores(this.response);
		this.props.navigation.navigate('SurveyFinish');
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
								<RadioButton labelHorizontal={false} key={i}>
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
		);
	}
}

Questions = connect(
	mapStateToProps, 
	mapDispatchToProps
)(Questions);

export default Questions;