import React, { Component } from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';

import { common, colors, dims } from '../global';

const styles = StyleSheet.create(common);

export default class Info extends Component {

	static navigatorButtons = {
		rightButtons: [
			{
				id: 'close',
				systemItem: 'stop',
			},
		]
	}

    constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this._handleNav.bind(this));
	}
	
	_handleNav(event) {
		if (event.type == 'NavBarButtonPress') {
		  	if (event.id == 'close') {
				this._handleClose();
		  	}
		}
	}

	_handleClose() {
		this.props.navigator.dismissModal({
			animationType: 'slide-down'
		});
	}

    render() {
		return (
			<View style = { styles.container }>
				<View style = { styles.content }>
					<View style = { styles.paddedContainer }>
						<Text style = { styles.emphasis }>SUSApp is an open source project created by the 
							<Text style = {{ color: colors.textBlue }}> Rice University Human Factors Research Lab</Text>.
						</Text>
						<Text style = {[ styles.spaced, { fontSize: dims.textMedium }]}>GitHub Repo: 
							<Text style = {{ color: colors.textBlue }} 
										onPress={() => Linking.openURL('https://github.com/jeffreyxiong/sus-app/')}> jeffreyxiong/sus-app</Text>
						</Text>
						<Text style = { styles.spaced }>--</Text>
						<Text style = {[ styles.spaced, { fontSize: dims.textMedium }]}>Designed and coded by <Text style = {{ fontWeight: '600' }}>Jeffrey Xiong</Text>. </Text>
						<Text style = {[ styles.spaced, { fontSize: dims.textMedium }]}>Developed by <Text style = {{ fontWeight: '600' }}>Dr. Philip Kortum</Text>, <Text style = {{ fontWeight: '600' }}>Dr. Claudia Ziegler Acemyan</Text>, and <Text style = {{ fontWeight: '600' }}>Jeffrey Xiong</Text>.</Text>
						<Text style = {[ styles.spaced, { fontSize: dims.textMedium }]}>Special thanks to <Text style = {{ fontWeight: '600' }}>John Brooke</Text>, who developed the System Usability Scale (1996). </Text>
					</View>
				</View>
				<View style = { styles.footer }>
					<Text style = {[ styles.spaced, { fontSize: dims.textSmall }]}>MIT License. Copyright 2018</Text>
				</View>
			</View>
		);
	}
}