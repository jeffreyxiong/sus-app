import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import AppService from '../../AppService';
import TouchableBox from '../../components/TouchableBox';

const styles = StyleSheet.create({
	main: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	form: {
		flex: 3
    },
    textField: {
		margin: 15,
		borderColor: '#979797', 
		borderWidth: 1,
		borderRadius: 10,
		padding: 15,
		fontSize: 14
	},
	multilineTextField: {
		height: 150,
		paddingTop: 15,
    },
    text: {
        marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		fontSize: 16
    },
    buttons: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
        marginBottom: 15,
	},
});

export default class SurveyReview extends Component {

    constructor(props) {
		super(props);
		this.state = { notesText: '' };
    }
    
    _handleChange = (text) => {
		this.setState(text);
    }
    
    _handleSave = () => {
        // Save scores
        AppService.addParticipant(this.props.studyName, this.props.participantName, 'Pre-SUS: ' + this.props.notes + ' -- Post-SUS: ' + this.state.notesText )
        for (var j = 0; j < this.props.response.length; j++) {
			AppService.addScore(this.props.studyName, this.props.participantName, j, this.props.response[j]);
		}
        // Reset back to home screen
        this.props.navigator.resetTo({
            screen: 'mobilesus.Home',
            title: 'SUS App',
            animated: true
        });
    }
    
    render() {
		return (
			<View style = { styles.main }>
				<View style = { styles.form }>
					<Text style = { styles.text }>Participant: { this.props.participantName }</Text>
                    <Text style = { styles.text }>Score: { AppService.getScore(this.props.response) }</Text>
                    <View>
						<Text style = { styles.text }>Final Notes:</Text>
						<TextInput 
							style = {[ styles.textField, styles.multilineTextField ]}
							onChangeText = { (notesText) => this._handleChange({ notesText }) }
							multiline = { true }
							returnKeyLabel = { "done" }
							returnKeyType = { "done" }
							blurOnSubmit = { true }
							value = { this.state.notesText }
							placeholder = "ex: Elaborated on Q2 of SUS"
						/>
					</View>
                    <Text style = { styles.text }>Note: All data saved locally on device.</Text>
				</View>
				<View style = { styles.buttons }>
					<TouchableBox
						onPress = { this._handleSave }
						disabled = { false }
						style = { { width: 300, height: 80, backgroundColor: "#69A6D7" } }
						textStyle = { { color: "white" } }
						text = "Save Participant"
					/>
				</View>
			</View>
		);
	}

}