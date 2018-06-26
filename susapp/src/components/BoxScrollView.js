import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default class BoxScrollView extends Component {
	render () {
		const { style, titleStyle, title, children } = this.props;
		return (
			<View style = { style }>
				<Text style = { titleStyle } > { title } </Text>
				<ScrollView>
					{ children }
				</ScrollView>
			</View>
		);
	}
}