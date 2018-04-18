import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, TouchableOpacity, Dimensions, TouchableNativeFeedback } from 'react-native';

// default styles
const styles = StyleSheet.create({
	inner: {
		flex: 0,
		alignSelf: 'flex-start',
	    alignItems: 'center',
	    justifyContent: 'center',
	    margin: 5
	},
	text: {
	    fontSize: 16,
	    fontWeight: '300',
	}
});

export default class TouchableBox extends Component {

	render() {

		const { onPress, disabled, style, textStyle, text } = this.props;

		if (Platform.OS === "ios") {
			return (
				<View>
					<TouchableOpacity onPress = { onPress } disabled = { disabled } >
						<View style = { [ styles.inner, style ] }>
							<Text style = { [ styles.text, textStyle ] }>{ text }</Text>
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