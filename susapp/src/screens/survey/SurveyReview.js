import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { common, darkBlue, navigator } from '../../global';
import AppService from '../../AppService';
import TouchableBox from '../../components/TouchableBox';

const specific = {
    text: {
		marginTop: 5,
		marginBottom: 5,
		fontSize: 18
    },
};

const styles = StyleSheet.create(Object.assign({}, common, specific));

export default class Review extends Component {

    constructor(props) {
		super(props);
		this.state = { notes: '' };
    }
    
    _handleChange = (text) => {
		this.setState(text);
    }
    
    _handleSave = () => {
        // Save scores
        AppService.addParticipant(this.props.productName, this.props.participantName, 'Pre-SUS: ' + this.props.notes + ' -- Post-SUS: ' + this.state.notes )
        for (var j = 0; j < this.props.response.length; j++) {
			AppService.addScore(this.props.productName, this.props.participantName, j, this.props.response[j]);
		}
        // Reset back to home screen
        this.props.navigator.resetTo({
            screen: 'screen.Home',
            title: 'Home',
            animated: true,
			navigatorStyle: navigator,
        });
    }
    
    render() {
		return (
			<View style = { styles.container }>
				<View style = { styles.content }>
                    <View style = { styles.paddedContainer }>
						<Text style = { styles.text }>Participant: { this.props.participantName }</Text>
						<Text style = { styles.text }>Score: { AppService.calcScore(this.props.response) }</Text>
						<Text style = {[ styles.text, { marginBottom: 15, }]}>Final Notes:</Text>
						<TextInput 
							style = {[ styles.textField, styles.multilineField ]}
							onChangeText = { (notes) => this._handleChange({ notes }) }
							multiline = { true }
							returnKeyLabel = { "done" }
							returnKeyType = { "done" }
							blurOnSubmit = { true }
							value = { this.state.notes }
							placeholder = "ex: Elaborated on Q2 of SUS"
						/>
					</View>    
				</View>
				<Text style = { styles.subtitle }>Note: All data saved locally on device.</Text>                
				<View style = { styles.footer }>
					<TouchableBox
						onPress = { this._handleSave }
						disabled = { false }
						style = { styles.touchFull }
						textStyle = { { color: "white" } }
						text = "Save Participant"
					/>
				</View>
			</View>
		);
	}

}