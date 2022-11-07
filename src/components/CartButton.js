import React, { Component } from 'react';
import { SetCart } from '../store/cart/cartActionCreator';
import { connect } from 'react-redux';
import cart from "../images/WhiteCart.png"

const mapDispatchToProps = (dispatch) => {
    return {
        setCartData: (data, attr) => dispatch(SetCart(data, attr)),
    }
}

class CartButton extends Component {

    render() {
        return (
            <button className="addButton" onClick={() => this.props.setCartData(this.props.data, JSON.stringify(this.props.attributes)) }>{this.props.img ? <img src={cart} alt="cart" /> : "ADD TO CART"}</button>
        );
    }
}

export default connect(null, mapDispatchToProps)(CartButton);