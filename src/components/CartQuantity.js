import React, { Component } from 'react';

class CartQuantity extends Component {
    constructor() {
        super()

        this.state = ({
            quantity: 1
        })
    }

    decrement() {
        if(this.state.quantity !== 1 ) {
            this.setState({quantity: this.state.quantity - 1})
        }
    }
    
    render() {
        return (
            <>
                <button className="increment"  onClick={() => this.setState({quantity: this.state.quantity + 1})} >+</button>
                <div className="quantity" >{this.state.quantity}</div>
                <button className="decrement"  onClick={() => this.decrement()} >&#x2212;</button>
                
            </>
        );
    }
}

export default CartQuantity;