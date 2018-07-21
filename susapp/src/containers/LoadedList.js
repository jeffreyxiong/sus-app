import { connect } from 'react-redux';
import { load, chooseProduct } from '../actions';
import AppService from '../AppService';
import ProductList from '../components/ProductList';

const mapStateToProps = state => ({
    data: state.data
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        load: () => { 
            dispatch(load());
        },
        chooseProduct: (name) => {
            p = AppService.getProduct(name);
            dispatch(chooseProduct(name, p.description, p.system));
            ownProps.navigate(name);
        }
    }
}

const LoadedList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);

export default LoadedList;