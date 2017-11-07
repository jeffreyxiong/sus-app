import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';

const styles = StyleSheet.create({
	view: {
		flex: 0,
		alignSelf: 'flex-start',
	    alignItems: 'center',
	    justifyContent: 'center',
	    marginTop: 5,
	    marginBottom: 5
	},
	text: {
	    fontSize: 18,
	    fontWeight: '300',
	}
});

class TouchableBox extends Component {

	render() {
		const { onPress, backgroundColor, text, textColor } = this.props;

		return (
			<View style = { [styles.view, backgroundColor, {width: 300, height: 80}] }>
				<TouchableOpacity onPress = { onPress }>
					<Text style = { [styles.text, textColor] }> { text } </Text>
				</TouchableOpacity>
			</View>

		);
	}
}

export default TouchableBox;