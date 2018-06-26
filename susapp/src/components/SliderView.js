import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { common, darkBlue } from '../global';

const initialLayout = {
	height: 0,
	width: Dimensions.get('window').width,
};

const styles = StyleSheet.create({
	container: {
		flex: 2,
		marginTop: 5,
	},
	indicator: {
		backgroundColor: darkBlue,
	},
	tabbar: {
		height: 60,
		backgroundColor: 'white',
	},
	label: {
		color: darkBlue,
		fontWeight: '400',
	},
	scene: {
		flex: 1,
		backgroundColor: '#F7F7F7',
		padding: 25,
	},
	columnText: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between'
	},
	text: {
		fontSize: 18,
		marginBottom: 15,
	},
	number: {
		color: "#306B9A",
		fontWeight: '600',
	}
});

export default class SliderView extends Component {

	state = {
		index: 0,
		routes: [
			{ key: '1', title: 'Description' },
			{ key: '2', title: 'Data' },
		],
	};

	_handleIndexChange = index => this.setState({ index });

	_renderTabBar = props =>
		<TabBar
			{ ...props }
			indicatorStyle = { styles.indicator }
			labelStyle = { styles.label }
			style = { styles.tabbar }
		/>;

	_renderScene = ({ route }) => {
		switch (route.key) {
			case '1':
				return (
					<View style = { styles.scene }>
						<Text style = { styles.text }>{ this.props.description }</Text>
					</View>
				)
			case '2':
				return (
					<View style = {[ styles.scene, styles.columnText ]}>
						<View>
							<Text style = { styles.text }>participants:</Text>
							<Text style = { styles.text }>mean:</Text>
							<Text style = { styles.text }>sample std. dev.:</Text>
							<Text style = { styles.text }>max:</Text>
							<Text style = { styles.text }>min:</Text>
						</View>
						<View>
							<Text style = {[ styles.text, styles.number ]}>{ this.props.count }</Text>
							<Text style = {[ styles.text, styles.number ]}>{ this.props.mean }</Text>
							<Text style = {[ styles.text, styles.number ]}>{ this.props.std }</Text>
							<Text style = {[ styles.text, styles.number ]}>{ this.props.max }</Text>
							<Text style = {[ styles.text, styles.number ]}>{ this.props.min }</Text>
						</View>
					</View>
				)
			default:
				return null
		}
	}

	render() {

		return (
			<TabView
				style = { styles.container }
				navigationState = { this.state }
				renderScene = { this._renderScene }
				renderTabBar = { this._renderTabBar }
				onIndexChange = { this._handleIndexChange }
				initialLayout = { initialLayout }
			/>
		);
	}
}