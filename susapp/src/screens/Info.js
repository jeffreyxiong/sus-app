import React, { Component } from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';

import { common, colors, dims } from '../global';
import TouchableBox from '../components/TouchableBox'
import Container from '../components/Container';

const styles = StyleSheet.create(common);

export default class Info extends Component {

    constructor(props) {
		super(props);
	}
	
	_handleDismiss = () => {
		this.props.navigation.goBack()
	}

    render() {
		return (
			<Container style = { styles.container }>
				<View style = {[ styles.content, { marginTop: 20, }]}>
					<View style = { styles.paddedContainer }>
						<Text style = { styles.emphasis }>SUSApp is an open source project created by the 
							<Text style = {{ color: colors.textBlue }}> Rice University Human Factors Research Lab</Text>.
						</Text>
						<Text style = {[ styles.spaced, { fontSize: dims.textMedium }]}>GitHub Repo: 
							<Text style = {{ color: colors.textBlue }} 
                                  onPress={ () => Linking.openURL('https://github.com/jeffreyxiong/sus-app/') }> jeffreyxiong/sus-app</Text>
						</Text>
						<Text style = { styles.spaced }>--</Text>
						<Text style = {[ styles.spaced, { fontSize: dims.textMedium }]}>Designed and coded by <Text style = {{ fontWeight: '600' }}>Jeffrey Xiong</Text>. </Text>
						<Text style = {[ styles.spaced, { fontSize: dims.textMedium }]}>Developed by <Text style = {{ fontWeight: '600' }}>Dr. Philip Kortum</Text>, <Text style = {{ fontWeight: '600' }}>Dr. Claudia Ziegler Acemyan</Text>, and <Text style = {{ fontWeight: '600' }}>Jeffrey Xiong</Text>.</Text>
						<Text style = {[ styles.spaced, { fontSize: dims.textMedium }]}>Special thanks to <Text style = {{ fontWeight: '600' }}>John Brooke</Text>, who developed the System Usability Scale (1996). </Text>
						<View style = {{ flex: 1, alignItems: 'center', marginTop: 10 }}>
							<Text style = {[ styles.spaced, { fontSize: dims.textSmall }]}>MIT License. Copyright 2018</Text>
						</View>
					</View>
				</View>
				<View style = { styles.footer }>
                    <TouchableBox
						onPress = { this._handleDismiss }
						disabled = { false }
						style = { styles.touchFull }
						textStyle = { { color: 'white' } }
						text = 'Close'
					/>
				</View>
			</Container>
		);
	}
}