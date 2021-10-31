import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeleteCart, SetQuantity } from "../store/cart/cartActionCreator"
import { getCartData } from '../store/cart/cartSelector'; 

const mapStateToProps = (props) => ({
    getCartData: getCartData(props),
 });

const mapDispatchToProps = (dispatch) => {
    return {
        setQuantity: (id, qty) => dispatch(SetQuantity(id, qty)),
        deleteCartData: (data) => dispatch(DeleteCart(data)),
    }
}

class CartQuantity extends Component {
    constructor(props) {
        super(props)

        this.data =  this.props.getCartData.find(id => id.newId === this.props.data.newId)
    }

    increment() {
        this.props.setQuantity(this.props.data.newId, this.data.qty + 1)

    }

    decrement() {
        if(this.data.qty > 1 ) {
            this.props.setQuantity(this.props.data.newId, this.data.qty - 1)
        } else {
            this.props.deleteCartData(this.props.data)
        }
    }

    
    render() {
        return (
            <>
                <button className="increment"  onClick={() => this.increment()} >+</button>
                <div className="quantity" >{this.data.qty}</div>
                <button className="decrement"  onClick={() => this.decrement()} >&#x2212;</button>
                
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartQuantity);