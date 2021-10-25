import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Loader from '../../components/Loader';
import { DeleteCart, SetCart } from '../../store/cart/cartActionCreator';
import { getCartData } from '../../store/cart/cartSelector';
import { getProductsCurrency } from '../../store/products/productsSelector';
import { connect } from 'react-redux';
import CartButton from '../../components/CartButton';
import ReactHtmlParser from "react-html-parser" 
import GetCurrencySymbol from '../../components/GetCurrencySymbol';
import ProductAttributes from "../../components/ProductAttributes"
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

class ProductPage extends Component {
    constructor() {
        super()
        
        this.state = {
            isLoading: true,
            productData: [],
            img: 0,
            pathname: ''
        }

    }

    getProduct() {
        this.setState({isLoading: true})
            Api.fetchSingleProduct(this.props.match.params.id)
                .then(data => this.setState({productData: data.data.product}))
                .then(this.setState({pathname: this.props.location.pathname}))
                .finally(this.setState({isLoading: false}))

    }

    componentDidMount() {
        this.getProduct()
    }

    componentDidUpdate() {
        if(this.state.pathname !== this.props.location.pathname) {
            this.getProduct()
        }
    }


    render() {
        return (
            <Loader loader={this.state.isLoading}>
                <div className="productPage" >
                    <div className="imgCont">
                        <div className="imgsBox">
                            {this.state.productData.gallery && this.state.productData.gallery.map((el, index) => {
                                return (
                                        <img className="imgs" src={el} onClick={() => this.setState({img: index})} key={index} alt={el.name}/>
                                )
                            })}
                        </div>
                        <div className="imgBox">
                            <img className="productImg" src={this.state.productData.gallery ? this.state.productData.gallery[this.state.img] : <></>} alt="product" />
                        </div>
                    </div>
                    <div className="describeCont">
                        <div>
                            <div className="productTitle" >{this.state.productData.name}</div>
                            <div className="productCategory" >{this.state.productData.category}</div>
                        </div>
                        <ProductAttributes bag='' data={this.state.productData} />
                        <div className="priceCont" >
                            <div className="priceTitle" >PRICE:</div>
                            <GetCurrencySymbol prices={this.state.productData.prices}/>
                        </div>
                        {!!this.state.productData.inStock ? <CartButton data={this.state.productData} img={false} /> : <div className="outOfStock" >out of stock</div>}
                        <div>
                            <div className="productDescribe">describe:</div>
                            <div>{ReactHtmlParser(this.state.productData.description)}</div>
                        </div>
                    </div>
                </div>
            </Loader>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter( ProductPage)) ;