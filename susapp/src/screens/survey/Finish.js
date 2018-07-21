import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { common } from '../../global';
import TouchableBox from '../../components/TouchableBox';

const styles = StyleSheet.create(common);

export default class Finish extends Component {

	static navigationOptions = () => ({
		title: "SUS Survey",
	});

    constructor(props) {
		super(props);
	}

    _handleConfirm = () => {
        this.props.navigation.navigate('SurveyHandoff');
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