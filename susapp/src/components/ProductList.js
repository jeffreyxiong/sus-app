import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { common, colors, dims } from '../global';
import TouchableBox from  './TouchableBox';
import BoxScrollView from  './BoxScrollView';

const specific = {
	existing: {
		flex: 4,
		alignItems: 'center',
		alignContent: 'flex-start',
		justifyContent: 'center',
		marginTop: 15,
		marginBottom: 15,
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

class ProductList extends Component {

    constructor(props) {
		super(props);
		this.props.load();
	}
    
    renderProducts = () => {

        const { data, chooseProduct } = this.props;

        return data.map((product, i) => {
			return (
				<TouchableBox 
					key = { i }
					onPress = { () => chooseProduct(product.name, product.system) }
					disabled = { false }
					style = { styles.touchProduct }
					textStyle = { { color: 'black' } }
					text = { product.name }
				/>
			);
		});
    }

    render() {
        
        const { data } = this.props;

		var existing;
		const width = Dimensions.get('window').width;

		if (data.length != 0) {
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
			<View style = { styles.nonexisting }>
				{ existing }
			</View>
		);
    }
}

export default ProductList;