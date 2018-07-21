import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { load, completeSurvey } from '../../actions';
import { common, dims } from '../../global';
import TouchableBox from '../../components/TouchableBox';
import AppService from '../../AppService';

const specific = {
    text: {
		marginTop: 5,
		marginBottom: 5,
		fontSize: dims.textLarge
    },
};

const styles = StyleSheet.create(Object.assign({}, common, specific));


const mapStateToProps = state => ({
    product: state.product.name,
    id: state.survey.id,
    notes: state.survey.notes,
    scores: state.survey.scores,
});

class Review extends Component {

	static navigationOptions = () => ({
		title: "SUS Survey",
	});

    constructor(props) {
		super(props);
		this.state = { notes: '' };
    }
    
    _handleChange = (text) => {
		this.setState(text);
    }
    
    _handleSave = () => {
        // Save scores
        AppService.addParticipant(this.props.product, this.props.id, 'Pre-SUS: ' + this.props.notes + ' -- Post-SUS: ' + this.state.notes )
        for (var j = 0; j < this.props.scores.length; j++) {
			AppService.addScore(this.props.product, this.props.id, j, this.props.scores[j]);
		}
        // Reset back to home screen
        this.props.navigation.popToTop();
    }
    
    render() {
		return (
			<View style = { styles.container }>
				<View style = { styles.content }>
                    <View style = { styles.paddedContainer }>
						<Text style = { styles.text }>Participant: { this.props.id }</Text>
						<Text style = { styles.text }>Score: { AppService.calcScore(this.props.scores) }</Text>
						<Text style = {[ styles.text, { marginBottom: 15, }]}>Final Notes:</Text>
						<TextInput 
							style = {[ styles.textField, styles.multilineField ]}
							onChangeText = { (notes) => this._handleChange({ notes }) }
                            multiline = { true }
                            numberOfLines = { 3 }
							returnKeyLabel = { 'done' }
							returnKeyType = { 'done' }
							blurOnSubmit = { true }
							value = { this.state.notes }
							placeholder = 'ex: Elaborated on Q2 of SUS'
						/>
					</View>    
				</View>
				<Text style = { styles.subtitle }>Note: All data saved locally on device.</Text>                
				<View style = { styles.footer }>
					<TouchableBox
						onPress = { this._handleSave }
						disabled = { false }
						style = { styles.touchFull }
						textStyle = { { color: 'white' } }
						text = 'Save Participant'
					/>
				</View>
			</View>
		);
	}
}

Review = connect(
    mapStateToProps,
)(Review);

export default Review;