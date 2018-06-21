import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppService from '../../AppService';
import TouchableBox from '../../components/TouchableBox';
const styles = StyleSheet.create({
    main: {
		flex: 1,
		flexDirection: 'column',
        justifyContent: 'space-around',
    },
    form: {
		flex: 3,
		flexDirection: 'column',
        margin: 15,
        alignItems: 'center',
	},
    prompt: {
		flex: 1,
		margin: 15,
		fontSize: 16,
		fontWeight: '600',
        height: 40,
        textAlign: 'center',
	},
    buttons: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
        marginBottom: 15,
	},
});

export default class SurveyFinish extends Component {

    constructor(props) {
		super(props);
	}

    _handleConfirm = () => {
        this.props.navigator.push({
			screen: 'mobilesus.SurveyInterstitial',
			title: 'SUS Survey',
			animated: true,
			passProps: {
				participantName: this.props.participantName,
				studyName: this.props.studyName,
                response: this.props.response,
                notes: this.props.notes
			},
			backButtonHidden: true
		});
    }

    render() {
		return (
			<View style = { styles.main }>
				<View style = { styles.form }>
					<Text style = { styles.prompt }>You've Finished!</Text>
                    <Text style = { styles.prompt }>Hit confirm and hand this device back to the experimenter.</Text>
				</View>
				
				<View style = { styles.buttons }>
					<TouchableBox
						onPress = { this._handleConfirm }
						disabled = { false }
						style = { { width: 300, height: 80, backgroundColor: "#69A6D7" } }
						textStyle = { { color: "white" } }
						text = "Confirm"
					/>
				</View>
			</View>
		);
	}


}