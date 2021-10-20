import React, { Component } from 'react';
import { DeleteCart, setCart } from '../store/cart/cartActionCreator';
import { getCartData } from '../store/cart/cartSelector';
import { connect } from 'react-redux';
import cart from "../images/WhiteCart.png"

const mapStateToProps = (props) => ({
    getCartData: getCartData(props),
 });

const mapDispatchToProps = (dispatch) => {
    return {
        setCartData: (data) => dispatch(setCart(data)),
        deleteCartData: (data) => dispatch(DeleteCart(data)),
    }
}

class CartButton extends Component {
    constructor(props){
        super(props)
    }
    
    componentDidMount() {
        this.setState({data: this.props.data})
    }

    render() {
        return (
            !!this.props.getCartData.find((data) => data.id === this.props.data.id) ?
            
            <button className="removeButton" onClick={() => this.props.deleteCartData(this.props.data)}>{this.props.img ? <img src={cart} /> : "REMOVE FROM CART"}</button>
            :
            <button className="addButton" onClick={() => this.props.setCartData(this.props.data) }>{this.props.img ? <img src={cart} /> : "ADD TO CART"}</button>
                
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);