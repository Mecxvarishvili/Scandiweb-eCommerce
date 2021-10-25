import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { ALLPRODUCTS_PAGE, PRODUCT_PAGE } from '../../serialzie/routes';
import { getProductsCurrency } from '../../store/products/productsSelector';
import { withRouter } from 'react-router';
import { DeleteCart, SetCart } from '../../store/cart/cartActionCreator';
import { getCartData } from '../../store/cart/cartSelector';
import CartButton from '../../components/CartButton';
import GetCurrencySymbol from '../../components/GetCurrencySymbol';
import Api from '../../serialzie/api';

const mapStateToProps = (props) => ({
    currency: getProductsCurrency(props),
    getCartData: getCartData(props),
 });
 
const mapDispatchToProps = (dispatch) => {
    return {
        setCartData: (data) => dispatch(SetCart(data)),
        deleteCartData: (data) => dispatch(DeleteCart(data)),
    }
}

class CardProducts extends Component {
    constructor() {
        super()

        this.state = {
            isLoading: true,
            data: [],
            pathname: ''
        };
    }

    getProducts() {
        this.setState({isLoading: true})
        Api.fetchCategoryProduct(this.props.location.pathname === ALLPRODUCTS_PAGE, this.props.match.params.id)
            .then(data => this.setState({data: data.data.category.products}))
            .then(this.setState({pathname: this.props.location.pathname}))
            .finally(this.setState({isLoading: false}))
    }

    componentDidMount() {
        this.getProducts()
    }

    componentDidUpdate() {
        if(this.state.pathname !== this.props.location.pathname) {
            this.getProducts()
            
        }
        
    }
    
    render() {
            return (
                <Loader loader={this.state.isLoading} >
                        {this.state.data.map((el, index)=> {
                            return (
                                <div className="cardCont" key={index}>
                                    <div className="inCardCont" >
                                        <Link className="a" to={PRODUCT_PAGE.replace(":id", el.id)} >
                                            <img className="img" src={el.gallery[0]} alt={el.name} />
                                            {el.inStock ? <></> : <div className="inStock" >out of stock</div> }
                                        </Link>
                                        <div className="title">{el.name}</div>
                                        <GetCurrencySymbol prices={el.prices} />
                                        {el.inStock ? <CartButton data={el} img={true}/> : <></> }
                                    </div>
                                </div>
                            )
                        })}
                </Loader>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardProducts));