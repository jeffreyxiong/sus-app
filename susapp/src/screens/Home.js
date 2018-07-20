import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { common, colors } from '../global';
import LoadedList from '../containers/LoadedList';
import TouchableBox from '../components/TouchableBox';
import Container from '../components/Container';

const styles = StyleSheet.create(common);

export default class Home extends Component {

	static navigationOptions = ({ navigation }) => ({
		title: 'Home',
		// headerRight: <Icon.Button 
		// 				onPress = { () => navigation.navigate('Info') } 
		// 				backgroundColor = { 'white' }
		// 				name = { 'information' } 
		// 				iconStyle = {{ color: colors.darkBlue }}
		// 				size = { 24 }
		// 			/>
	});

	constructor(props) {
		super(props);
	}

	/**************************************************************************
	 * event handlers
	 *************************************************************************/

	_handleNewProduct = () => {
		this.props.navigation.navigate('NewProduct');
	}

	_handleOpenProduct = (product) => {
		this.props.navigation.navigate('Product', {
			productName: product,
		});
	}

	/**************************************************************************
	 * render
	 *************************************************************************/

	render() {

		return (
			<Container style = { styles.container }>
				<LoadedList navigate = { this._handleOpenProduct }/>
				<View style = { styles.footer }>
			 		<TouchableBox
			 			onPress = { this._handleNewProduct }
			 			disabled = { false }
			 			style = { styles.touchFull }
			 			textStyle = { { color: 'white' } }
			 			text = 'Add a New Product'
			 		/>
			 	</View>
			</Container>
		);
	}
}