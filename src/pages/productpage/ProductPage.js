import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Loader from '../../components/Loader';
import { SINGLE_PRODUCT_QUERY } from '../../serialzie/querySerialize';
import { DeleteCart, setCart } from '../../store/cart/cartActionCreator';
import { getCartData } from '../../store/cart/cartSelector';
import store from '../../store/store';


class ProductPage extends Component {
    constructor(props) {
        super(props)
        
        this.store = store
        this.dispatch = store.dispatch
        this.selector = store.getState
        
        this.state = {
            isLoading: true,
            productData: [],
            pathname: window.location.pathname.substring(1),
            img: 0,
            cartData: this.store.getState(getCartData).cartProducts,
            isAdded: !!this.selector(getCartData).cartProducts.find((data) => data.id === window.location.pathname.substring(1)),

        }

    }

    componentDidMount() {
        this.setState({isLoading: true})
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({query: SINGLE_PRODUCT_QUERY(this.state.pathname)})
        })
            .then(res => res.json())
            .then(data => this.setState({productData: data.data.product}))
            .then(this.setState({isLoading: false}))
    }

    /* componentDidUpdate(previousProps, previousState) {
        if (previousState.cartData !== this.state.cartData) {
            this.forId = !!this.store.getState(getCartData).cartProducts.find((data) => data.id === this.state.productData.id )
            console.log(this.forId)
        }
    
    } */

    addToCart() {
        this.dispatch(setCart(this.state.productData))
        this.setState({cartData: this.selector(getCartData).cartProducts})
        this.setState({isAdded: true})

    }

    removeFromCart() {
        this.dispatch(DeleteCart(this.state.productData))
        this.setState({cartData: this.selector(getCartData)})
        this.setState({ isAdded: false})
    }


    render() {
            return (
                <Loader loader={this.state.isLoading}>
                    <div className="productPage" >
                        <div className="imgsCont">
                            {this.state.productData.gallery && this.state.productData.gallery.map((el, index) => {
                                return (
                                        <img className="img" src={el} onClick={() => this.setState({img: index})} />
                                )
                            })}
                        </div>
                        <div className="imgCont">
                            <img src={this.state.productData.gallery ? this.state.productData.gallery[this.state.img] : <></>} />
                        </div>
                        <div className="describeCont">
                            <div className="title" >{this.state.productData.name}</div>
                            <div className="category" >{this.state.productData.category}</div>
                                {this.state.productData.category === "clothes" ?
                                    <div className="sizeCont" >
                                        <div className='size'>{this.state.productData.attributes[0].id}:</div>
                                        <div className="inSizeCont">
                                            {this.state.productData.attributes && this.state.productData.attributes[0].items.map((el, index) => {
                                               return (
                                                    <div className="sizeBox" key={index}>
                                                        <input className="input" type="radio" id={el.value} name="size" value={el.value} checked />
                                                        <label className="label" for={el.value}>{el.value}</label>
                                                    </div>
                                                   )
                                            })}
                                        </div>
                                    </div>
                                :
                                this.state.productData.attributes && this.state.productData.attributes.map((el, index) => {
                                    return(
                                        <div className="describe" key={index}>
                                            <div className="describeTitle" >{el.id}:</div>
                                            <div className="inDescribeCont">
                                                {el.items.map((el, index, ) => {
                                                    return (
                                                        <div className="inputBox" key={index}>
                                                            <input className="input" type="radio" id={el.value} name="color"  value={el.value} checked />
                                                            <label className="label" for={el.value}>{el.id}</label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                    )
                                })
                                }
                            <div className="priceCont" >
                                <div className="priceTitle" >PRICE:</div>
                                <div className="price" >{this.state.productData.prices ? this.state.productData.prices[0].amount  : <></>}</div>
                            </div>
                            { 
                            this.state.isAdded ?
                                <button className="removeButton" onClick={() => this.removeFromCart()}>REMOVE FROM CART</button>
                                :
                                <button className="addButton" onClick={() => this.addToCart()}>ADD TO CART</button>
                            }
                            <div dangerouslySetInnerHTML={{ __html: this.state.productData.description}}></div>
                        </div>
                    </div>
                </Loader>
            );
    }   
}

export default ProductPage ;