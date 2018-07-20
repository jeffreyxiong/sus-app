import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { common, colors, dims } from '../global';

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
		backgroundColor: colors.darkBlue,
	},
	tabbar: {
		height: 60,
		backgroundColor: 'white',
	},
	label: {
		color: colors.darkBlue,
		fontSize: dims.textSmall,
		fontWeight: '600',
	},
	scene: {
		flex: 1,
		backgroundColor: colors.offWhite,
		padding: dims.marginStandard,
	},
	columnText: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between'
	},
	text: {
		fontSize: dims.textLarge,
		marginBottom: dims.textMarginL,
	},
	number: {
		color: colors.textBlue,
		fontWeight: '600',
	}
});

export default class SliderView extends Component {

	firstRoute = () => {
		return (
			<View style = { styles.scene }>
				<Text style = { styles.text }>{ this.props.description }</Text>
			</View>
		);
	}

	secondRoute = () => {
		return (
			<View style = {[ styles.scene, styles.columnText ]}>
				<View>
					<Text style = { styles.text }>participants:</Text>
					<Text style = { styles.text }>mean:</Text>
					<Text style = { styles.text }>stdev:</Text>
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
		);
	}

	state = {
		index: 0,
		routes: [
			{ key: 'first', title: 'Description' },
			{ key: 'second', title: 'Data' },
		],
	};

	_renderTabBar = props =>
		<TabBar
			{ ...props }
			indicatorStyle = { styles.indicator }
			labelStyle = { styles.label }
			style = { styles.tabbar }
		/>;

	render() {

		return (
			<TabView
				style = { styles.container }
				navigationState = { this.state }
				renderScene = { SceneMap({
					first: this.firstRoute,
					second: this.secondRoute,
				}) }
				renderTabBar = { this._renderTabBar }
				onIndexChange = { (index) => this.setState({ index }) }
				initialLayout = { initialLayout }
			/>
		);
	}
}