import { connect } from 'react-redux';
import { load, chooseProduct } from '../model/actions';
import ProductList from '../components/ProductList';

const mapStateToProps = state => ({
    data: state.data
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        load: () => { 
            dispatch(load());
        },
        chooseProduct: product => {
            dispatch(chooseProduct(product));
            ownProps.navigate(product);
        }
    }
}

const LoadedList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);

export default LoadedList;