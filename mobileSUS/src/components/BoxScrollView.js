import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppService from '../AppService';

const styles = StyleSheet.create({
	title: {
		marginBottom: 5
	}
});

class BoxScrollView extends Component {
	render () {
		const { outerStyle, text, children } = this.props;
		return (
			<View style = { outerStyle }>
				<Text style = {styles.title} > { text } </Text>
				<ScrollView>
					{ children }
				</ScrollView>
			</View>
		);
	}
}

export default BoxScrollView;