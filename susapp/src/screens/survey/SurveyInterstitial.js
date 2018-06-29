import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { common, dims } from '../../global';
import AppService from '../../AppService';
import TouchableBox from '../../components/TouchableBox';

const specific = {
    form: {
		flex: 3,
		flexDirection: 'column',
        margin: dims.sideMargin,
        alignItems: 'center',
	},
    prompt: {
		flex: 1,
		margin: dims.sideMargin,
		fontSize: 18,
		fontWeight: '600',
        height: 40,
        textAlign: 'center',
	},
};

const styles = StyleSheet.create(Object.assign({}, common, specific));

export default class Interstitial extends Component {

    constructor(props) {
		super(props);
	}

    _handleConfirm = () => {
        this.props.navigator.push({
			screen: 'survey.Review',
			title: 'SUS Survey',
			animated: true,
			passProps: {
				participantName: this.props.participantName,
				productName: this.props.productName,
                response: this.props.response,
                notes: this.props.notes
			},
			backButtonHidden: true
		});
    }

    render() {
		return (
			<View style = { styles.container }>
				<View style = { styles.form }>
					<Text style = { styles.prompt }>Experimenter: Press continue to review results.</Text>
				</View>
				
				<View style = { styles.footer }>
					<TouchableBox
						onPress = { this._handleConfirm }
						disabled = { false }
						style = { styles.touchFull }
						textStyle = { { color: 'white' } }
						text = 'Continue'
					/>
				</View>
			</View>
		);
	}


}