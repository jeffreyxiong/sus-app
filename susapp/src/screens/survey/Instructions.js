import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { common, dims } from '../../global';
import TouchableBox from '../../components/TouchableBox';
import Container from '../../components/Container';

const specific = {
	bulletText: {
		fontSize: dims.textMedium,
		flex: 1, 
		paddingLeft: dims.marginStandard,
	},
	bullet: {
		fontSize: dims.textMedium,
	},
	bulletContainer: {
		flexDirection: 'row',
		marginLeft: 10,
		marginBottom: 15,
	}
};

const styles = StyleSheet.create(Object.assign({}, common, specific));

export default class Instructions extends Component {

    static navigationOptions = ({ navigation }) => ({
		title: "SUS Instructions",
	});

	constructor(props) {
        super(props);
	}

	_handleStart = () => {
		console.log('why');
		this.props.navigation.navigate('SurveyQuestions');
	}

	render() {
		return (
			<Container style = { styles.container }>
				<View style = { styles.content }>
					<View style = { styles.paddedContainer }>
						<Text style = { styles.emphasis }>For each of the following questions:</Text>
						<View style = { styles.bulletContainer }>
							<Text style = { styles.bullet }>{ '\u2022' }</Text>
							<Text style = { styles.bulletText }>Keep in mind the system you just used.</Text>
						</View>
						<View style = { styles.bulletContainer }>
							<Text style = { styles.bullet }>{ '\u2022' }</Text>
							<Text style = { styles.bulletText }>Reflect your immediate response to each statement.</Text>
						</View>
						<View style = { styles.bulletContainer }>
							<Text style = { styles.bullet }>{ '\u2022' }</Text>
							<Text style = { styles.bulletText }>Don't think too long on each one.</Text>
						</View>
						<View style = { styles.bulletContainer }>
							<Text style = { styles.bullet }>{ '\u2022' }</Text>
							<Text style = { styles.bulletText }>Make sure you respond to each statement.</Text>
						</View>
					</View>
				</View>
				<View style = { styles.footer }>
					<TouchableBox
						onPress = { this._handleStart }
						disabled = { false }
						style = { styles.touchFull }
						textStyle = { { color: 'white' } }
						text = 'Start'
					/>
				</View>
			</Container>
		);
	}
}