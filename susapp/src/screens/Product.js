import React, { Component } from 'react';
import { View, InteractionManager, StyleSheet, Alert, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { common, colors, dims } from '../global';
import AppService from '../AppService';
import TouchableBox from '../components/TouchableBox';
import { connect } from 'react-redux';
import ProductDetail from '../components/ProductDetail';
import Container from '../components/Container';
import { load } from '../actions';

const specific = {
	scene: {
		flex: 1,
		backgroundColor: colors.offWhite,
		padding: dims.marginStandard,
	},
	text: {
		fontSize: dims.textMedium,
		marginBottom: dims.textMarginL,
	},
	columnText: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between'
	},
	number: {
		color: colors.textBlue,
		fontWeight: '600',
	},
	productFooter: {
		minHeight: dims.buttonHeight / 2,
	},
}
const styles = StyleSheet.create(Object.assign({}, common, specific));

const mapStateToProps = state => ({
	product: state.product.name,
	desc: state.product.desc,
});

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		delete: (product) => {
			ownProps.navigation.pop();
			AppService.removeProduct(product);
			dispatch(load());
		}
	}
};

class Product extends Component {

    static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam('productName'),
		headerRight: <Icon.Button 
						onPress = { () => navigation.state.params.handleDelete() }
						backgroundColor = { 'white' }
						name = { 'delete' } 
						iconStyle = {{ color: colors.darkBlue }}
						size = { 24 }
					/>
	});

	constructor(props) {
		super(props);
		this.productName = this.props.product;
		this.productDesc = this.props.desc;
	}
    
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({ 
                handleDelete: this._handleDelete.bind(this)
            });
        });
    }

	_handleAddParticipant = () => {
		this.props.navigation.navigate('NewParticipant');
	}

	_handleEmail = () => {
		this.props.navigation.navigate('Email', {
			productName: this.productName,
		});
	}

	_handleDelete = () => {
		Alert.alert(
			'Delete ' + this.productName,
			'Are you sure you want to delete this product? Your data will not be recoverable.',
			[
				{text: 'Ok', onPress: () => this.props.delete(this.productName)},
				{text: 'Cancel', onPress: () => {} },
			]
		)
	}

	render() {
		dataSet = AppService.getStat(this.productName)
		return (
			<Container style={ styles.container }>
				<ProductDetail style = {{ flex: 2, }}>
					<View style = { styles.scene }>
						<Text style = { styles.text }>{ this.productDesc }</Text>
					</View>
					<View style = {[ styles.scene, styles.columnText ]}>
						<View>
							<Text style = { styles.text }>participants:</Text>
							<Text style = { styles.text }>mean:</Text>
							<Text style = { styles.text }>stdev:</Text>
							<Text style = { styles.text }>max:</Text>
							<Text style = { styles.text }>min:</Text>
						</View>
						<View>
							<Text style = {[ styles.text, styles.number ]}>{ dataSet.size }</Text>
							<Text style = {[ styles.text, styles.number ]}>{ dataSet.mean }</Text>
							<Text style = {[ styles.text, styles.number ]}>{ dataSet.std }</Text>
							<Text style = {[ styles.text, styles.number ]}>{ dataSet.max }</Text>
							<Text style = {[ styles.text, styles.number ]}>{ dataSet.min }</Text>
						</View>
					</View>
				</ProductDetail>
				<View style={[ styles.footer, styles.productFooter ]}>
					<TouchableBox 
						onPress = { this._handleAddParticipant }
						disabled = { false }
						style = { styles.touchFull }
						textStyle = { { color: 'white' } }
						text = 'Add a New Participant'
					/>
					<TouchableBox
						onPress = { this._handleEmail }
						disabled = { false }
						style = { styles.touchFull }
						textStyle = { { color: 'white' } }
						text = 'Email Product Data'
					/>
				</View>
			</Container>
		);
	}
}

Product = connect(
	mapStateToProps, 
	mapDispatchToProps
)(Product);

export default Product;