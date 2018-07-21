import { connect } from 'react-redux';
import { load, chooseProduct } from '../actions';
import ProductList from '../components/ProductList';

const mapStateToProps = state => ({
    data: state.data
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        load: () => { 
            dispatch(load());
        },
        chooseProduct: (name, system) => {
            dispatch(chooseProduct(name, system));
            ownProps.navigate(name);
        }
    }
}

const LoadedList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);

export default LoadedList;