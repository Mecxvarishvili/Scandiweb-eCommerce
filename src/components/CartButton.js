import React, { Component } from 'react';
import { DeleteCart, SetCart } from '../store/cart/cartActionCreator';
import { getCartData } from '../store/cart/cartSelector';
import { connect } from 'react-redux';
import cart from "../images/WhiteCart.png"

const mapStateToProps = (props) => ({
    getCartData: getCartData(props),
 });

const mapDispatchToProps = (dispatch) => {
    return {
        setCartData: (data, attr) => dispatch(SetCart(data, attr)),
        deleteCartData: (data) => dispatch(DeleteCart(data)),
    }
}

class CartButton extends Component {

    render() {
        return (
            <button className="addButton" onClick={() => this.props.setCartData(this.props.data, JSON.stringify(this.props.attributes)) }>{this.props.img ? <img src={cart} alt="cart" /> : "ADD TO CART"}</button>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);