import React, { Component } from 'react';
import { getCartData } from '../../store/cart/cartSelector';
import store from '../../store/store';

class CartPage extends Component {
    constructor() {
        super()

        this.state = {
            data: new store.getState(getCartData)
        }
    }

    render() {
        return (
            <div className="cartPage">
                <div className="title">Cart</div>
                <div className="productsCont">
                    {this.state.data.cartProducts.map((el, index) => {
                        return (
                            <>
                                <div className="line" ></div>
                                <div key={index} className="productBox" >
                                    <div className="cont1">
                                        <div className="name" >{el.name}</div>
                                        <div className="category" >{el.category}</div>
                                        <div className="price" >{el.prices[0].amount}</div>
                                        <div>
                                            formap
                                        </div>
                                    </div>
                                    <div className="cont2">
                                        <div className="qtyBox">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <div className="imgBox">
                                            <img src={el.gallery[0]} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                    
                </div>
            </div>
        );
    }
}

export default CartPage;