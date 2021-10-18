import React, { Component } from 'react';
import { DeleteCart, setCart } from '../store/cart/cartActionCreator';
import { getCartData } from '../store/cart/cartSelector';
import store from '../store/store';

class CartButton extends Component {
    constructor(props){
        super(props)

        this.dispatch = store.dispatch
        this.selector = store.getState
        this.store = store

        this.state = {
            data: props.data,
            cartData: this.selector(getCartData),
            isAdded:  this.selector(getCartData).cartProducts.find((data) =>data.id === this.data.id)
        }
    }
    
    componentDidMount() {
        this.setState({data: this.props.data})
    }

    addToCart() {
        console.log(this.data)
        this.dispatch(setCart(this.state.data))
        this.setState({cartData: this.selector(getCartData)})
        this.setState({ isAdded: this.state.cartData.cartProducts.find(data => data.id === this.data.id)})

    }

    removeFromCart() {
        this.dispatch(DeleteCart(this.state.productData))
        this.setState({cartData: this.selector(getCartData)})
        this.setState({ isAdded: !!this.state.cartData.cartProducts.find(data => data.id === this.data.id)})
    }

    /* componentDidlUpdate(prevProps) {
        if (this.store.getState(getCartData) !== prevProps.store.getState(getCartData)){
            this.setState({isAdded: true})
        }

    } */

    render() {
        return (
            
            this.state.isAdded ?
                <button className={this.props.class} onClick={() => this.removeFromCart()}>REMOVE FROM CART</button>
                :
                <button className="addButton" onClick={() => this.addToCart()}>ADD TO CART</button>
                
        );
    }
}

export default CartButton;