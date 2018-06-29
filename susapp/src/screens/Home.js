import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, Image } from 'react-native';

import { common, colors, dims } from '../global';
import AppService from '../AppService';
import BoxScrollView from  '../components/BoxScrollView';
import TouchableBox from '../components/TouchableBox';

const specific = {
	existing: {
		flex: 4,
		alignItems: 'center',
		alignContent: 'flex-start',
		justifyContent: 'center',
		marginTop: 15,
		marginBottom: 15
	},
	nonexisting: {
		flex: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
	touchProduct: {
		width: dims.contentWidth, 
        height: dims.buttonHeight,
		backgroundColor: colors.lightBlue,
		borderRadius: 5,
	}
};
const styles = StyleSheet.create(Object.assign({}, common, specific));

class Home extends Component {

	static navigatorButtons = {
		rightButtons: [
			{
				title: 'Info',
				id: 'info',
				buttonFontSize: 16,
				buttonFontWeight: '600', 
			},
		]
	}

	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this._handleNav.bind(this));

		if (this.props.emailSuccess == true) this._handleEmailAlert();
	}

	/**************************************************************************
	 * event handlers
	 *************************************************************************/

	_handleNav(event) {
		if (event.type == 'NavBarButtonPress') {
		  	if (event.id == 'info') {
				this._handleInfo();
		  	}
		}
	}

	_handleEmailAlert = () => {
		this.props.navigator.showInAppNotification({
			screen: 'note.Success',
			passProps: {
				text: 'Emailed ' + this.props.productName + ' successfully.'
			}, 
			autoDismissTimerSec: 3
		});
	}

	_handleInfo = () => {
		// this.props.navigator.push({
		// 	screen: 'screen.Info',
		// 	title: 'Info',
		// 	backButtonTitle: '',
		// });
		this.props.navigator.showModal({
			screen: "screen.Info",
			title: "Info",
			navigatorStyle: {
				navBarLeftButtonColor: colors.darkBlue,
				navBarRightButtonColor: colors.darkBlue,
				navBarButtonColor: colors.darkBlue,
			}, 
			animationType: 'slide-up',
		  });
	}

	_handleNewProduct = () => {
		this.props.navigator.push({
			screen: 'screen.NewProduct',
			title: 'Add a New Product',
			backButtonTitle: '',
		});
	}

	_handleOpenProduct = (product) => {
		console.log(product.description);
		this.props.navigator.push({
			screen: 'screen.Product',
			title: product.name,
			backButtonTitle: '',
			passProps: {
				productName: product.name,
				productDesc: product.description,
			}
		});
	}

	/**************************************************************************
	 * render
	 *************************************************************************/

	renderProducts() {
		let products = AppService.getProducts();

		return products.map((product, i) => {
			return (
				<TouchableBox 
					key = { i }
					onPress = { () => this._handleOpenProduct(product) }
					disabled = { false }
					style = { styles.touchProduct }
					textStyle = { { color: 'black' } }
					text = { product.name }
				/>
			);
		});
	}

	render() {
		// Get all existing products
		let products = AppService.getProducts();

		var existing;
		const {height, width} = Dimensions.get('window');

		if (products.length != 0) {
			existing = 	
				<BoxScrollView
					style = { styles.existing }
					titleStyle = { styles.subtitle }
					title = 'Existing Products'>
					{ this.renderProducts() }
				</BoxScrollView>
		} else {
			existing = 	
				<View style = { styles.nonexisting }>
					<Image
						resizeMode = 'cover'
						style = {{ width: width * 0.2, 
								   height: width * 0.28,
								   marginBottom: 25,
								}}
						source = { require('../../assets/empty.png') }
					/>
					<Text style = { styles.subtitle }>No products yet.</Text>
					<Text style = { styles.subtitle }>Get started below!</Text>
				</View>
		}

		return (
			<View style = { styles.container }>
				{ existing }
				<View style = { styles.footer }>
					<TouchableBox
						onPress = { this._handleNewProduct }
						disabled = { false }
						style = { styles.touchFull }
						textStyle = { { color: 'white' } }
						text = 'Add a New Product'
					/>
				</View>
			</View>
		);
	}
}

export default Home;