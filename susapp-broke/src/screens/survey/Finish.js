import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { common } from '../../global';
import TouchableBox from '../../components/TouchableBox';

const styles = StyleSheet.create(common);

export default class Finish extends Component {

	static navigationOptions = ({ navigation, screenProps }) => ({
		title: "SUS Survey",
	});

    constructor(props) {
		super(props);
		this.productName = this.props.navigation.getParam('productName');
        this.participantName = this.props.navigation.getParam('participantName');
		this.notes = this.props.navigation.getParam('notes');
		this.response = this.props.navigation.getParam('response');
	}

    _handleConfirm = () => {
        this.props.navigation.navigate('SurveyHandoff', {
			participantName: this.participantName,
            productName: this.productName,
			notes: this.notes,
			response: this.response
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