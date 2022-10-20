import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Loader from '../../components/Loader';
import { DeleteCart, SetCart } from '../../store/cart/cartActionCreator';
import { connect } from 'react-redux';
import CartButton from '../../components/CartButton';
import parse from "html-react-parser"
import GetCurrency from '../../components/GetCurrency';
import ProductAttributes from "./ProductAttributes"
import Api from '../../serialzie/api';

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
            pathname: '',
            attributes: [],
        }

    }

    getProduct() {
        this.setState({isLoading: true})
            Api.fetchSingleProduct(this.props.match.params.id)
                .then(data => this.setState({productData: data.data.product, isLoading: false}))
                .then(this.setState({pathname: this.props.location.pathname}))
            
    }

    componentDidMount() {
        this.getProduct()
    }

    componentDidUpdate() {
        if(this.state.pathname !== this.props.location.pathname) {
            this.getProduct()
            this.setState({attributes: []})
        }
    }

    setAttributes(data) {
        if(!this.state.attributes.length || !this.state.pathname === this.props.location.pathname) {
            this.setState({attributes: [...data]})
        } else {
            var addData = [...this.state.attributes]
            addData.find(el => el.id === data.id).value = data.value
            this.setState({attributes: [...addData]})
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
                        <ProductAttributes data={this.state.productData} setAtt={(attr) => this.setAttributes(attr)} />
                        <div className="priceCont" >
                            <div className="priceTitle" >PRICE:</div>
                            <GetCurrency prices={this.state.productData.prices}/>
                        </div>
                        {!!this.state.productData.inStock ? <CartButton attributes={this.state.attributes} data={this.state.productData} img={false} /> : <div className="outOfStock" >out of stock</div>}
                        <div>
                            <div className="productDescribe">describe:</div>
                            {this.state.productData.description && <div>{parse(this.state.productData.description)}</div>}
                        </div>
                    </div>
                </div>
            </Loader>
        );
    }
}

export default connect(null, mapDispatchToProps)(withRouter( ProductPage)) ;