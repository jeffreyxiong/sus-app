import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { common, dims } from '../../global';
import AppService from '../../model/AppService';
import TouchableBox from '../../components/TouchableBox';

const specific = {
    text: {
		marginTop: 5,
		marginBottom: 5,
		fontSize: dims.textLarge
    },
};

const styles = StyleSheet.create(Object.assign({}, common, specific));

export default class Review extends Component {

	static navigationOptions = ({ navigation, screenProps }) => ({
		title: "SUS Survey",
	});

    constructor(props) {
		super(props);
		this.state = { notes: '' };
		this.productName = this.props.navigation.getParam('productName');
        this.participantName = this.props.navigation.getParam('participantName');
		this.notes = this.props.navigation.getParam('notes');
		this.response = this.props.navigation.getParam('response');
    }
    
    _handleChange = (text) => {
		this.setState(text);
    }
    
    _handleSave = () => {
        // Save scores
        AppService.addParticipant(this.productName, this.participantName, 'Pre-SUS: ' + this.notes + ' -- Post-SUS: ' + this.state.notes )
        for (var j = 0; j < this.response.length; j++) {
			AppService.addScore(this.productName, this.participantName, j, this.response[j]);
		}
        // Reset back to home screen
        this.props.navigation.popToTop();
    }
    
    render() {
		return (
			<View style = { styles.container }>
				<View style = { styles.content }>
                    <View style = { styles.paddedContainer }>
						<Text style = { styles.text }>Participant: { this.participantName }</Text>
						<Text style = { styles.text }>Score: { AppService.calcScore(this.response) }</Text>
						<Text style = {[ styles.text, { marginBottom: 15, }]}>Final Notes:</Text>
						<TextInput 
							style = {[ styles.textField, styles.multilineField ]}
							onChangeText = { (notes) => this._handleChange({ notes }) }
							multiline = { true }
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