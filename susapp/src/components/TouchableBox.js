import React, { Component } from 'react';
import { Platform, 
		 View, 
		 Text, 
		 StyleSheet, 
		 TouchableOpacity, 
		 TouchableNativeFeedback } from 'react-native';
import { dims } from '../global';

// default styles
const styles = StyleSheet.create({
	inner: {
		flex: 0,
		alignSelf: 'flex-start',
	    alignItems: 'center',
	    justifyContent: 'center',
	    margin: 5,
	},
	text: {
	    fontSize: dims.textLarge,
	    fontWeight: '600',
	}
});

export default class TouchableBox extends Component {

	render() {

		const { onPress, disabled, style, textStyle, text } = this.props;

		if (Platform.OS === 'ios') {
			return (
				<View>
					<TouchableOpacity onPress = { onPress } 
									  disabled = { disabled } >
						<View style = {[ styles.inner, style ]}>
							<Text style = {[ styles.text, textStyle ]}>{ text }</Text>
						</View>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View>
					<TouchableNativeFeedback onPress = { onPress }>
						<View style = { [ styles.inner, style ] }>
							<Text style = { [ styles.text, textStyle ] }>{ text }</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			)
		}
	}
}