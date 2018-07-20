import React, { Component } from 'react';
import { View, Platform, SafeAreaView } from 'react-native';

export default class Container extends Component {

	render () {
        const { style, children } = this.props;

		if (Platform.OS === 'ios') {
            return (
                <SafeAreaView style = { style }>
                    { children }
                </SafeAreaView>
            );
        } else {
            return (
                <View style = { style }>
                    { children }
                </View>
            );
        }
		
	}
}