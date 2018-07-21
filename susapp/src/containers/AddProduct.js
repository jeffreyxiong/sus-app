import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { load } from '../actions';
import { common } from '../global';
import TouchableBox from '../components/TouchableBox';

const styles = StyleSheet.create(common);

const mapStateToProps = (state) => ({
    state: state.data
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addProduct: () => {
            ownProps.create(() => dispatch(load()));
        }
    }
}

class AddProduct extends Component {
    render() {
        const { addProduct } = this.props;
        return (
            <TouchableBox
                onPress = { () => addProduct() }
                disabled = { false }
                style = {[ styles.touchFull, { opacity : 1}]}
                textStyle = { {  color: "white" } }
                text = "Create"
            />
        );
    }
}

AddProduct = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddProduct);

export default AddProduct;