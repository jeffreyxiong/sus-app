import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { common } from '../../global';
import AppService from '../../AppService';
import TouchableBox from '../../components/TouchableBox';

const styles = StyleSheet.create(common);

export default class Finish extends Component {

    constructor(props) {
		super(props);
	}

    _handleConfirm = () => {
        this.props.navigator.push({
			screen: 'survey.Interstitial',
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
				<View style = { styles.content }>
					<View style = { styles.paddedContainer }>
						<Text style = {[ styles.emphasis, { textAlign: 'center' }]}>You've Finished!</Text>
						<Text style = {[ styles.emphasis, { textAlign: 'center' }]}>Hit confirm and hand this device back to the experimenter.</Text>
					</View>
				</View>
				<View style = { styles.footer }>
					<TouchableBox
						onPress = { this._handleConfirm }
						disabled = { false }
						style = { styles.touchFull }
						textStyle = { { color: 'white' } }
						text = 'Confirm'
					/>
				</View>
			</View>
		);
	}


}