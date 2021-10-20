import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Loader from '../../components/Loader';
import { SINGLE_PRODUCT_QUERY } from '../../serialzie/querySerialize';
import { DeleteCart, setCart } from '../../store/cart/cartActionCreator';
import { getCartData } from '../../store/cart/cartSelector';
import { getProductsCurrency } from '../../store/products/productsSelector';
import { connect } from 'react-redux';
import CartButton from '../../components/CartButton';


const mapStateToProps = (props) => ({
    currency: getProductsCurrency(props),
    getCartData: getCartData(props),
 });

const mapDispatchToProps = (dispatch) => {
    return {
        setCartData: (data) => dispatch(setCart(data)),
        deleteCartData: (data) => dispatch(DeleteCart(data)),
    }
}

class ProductPage extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            isLoading: true,
            productData: [],
            img: 0,
        }

    }

    componentDidMount() {
        this.setState({isLoading: true})
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({query: SINGLE_PRODUCT_QUERY(this.props.match.params.id)})
        })
            .then(res => res.json())
            .then(data => this.setState({productData: data.data.product}))
            .finally(this.setState({isLoading: false}))
    }


    render() {
            return (
                <Loader loader={this.state.isLoading}>
                    <div className="productPage" >
                        <div className="imgCont">
                            <div className="imgsBox">
                                {this.state.productData.gallery && this.state.productData.gallery.map((el, index) => {
                                    return (
                                            <img className="img" src={el} onClick={() => this.setState({img: index})} />
                                    )
                                })}
                            </div>
                            <div className="imgBox">
                                <img src={this.state.productData.gallery ? this.state.productData.gallery[this.state.img] : <></>} />
                            </div>
                        </div>
                        <div className="describeCont">
                            <div>
                                <div className="title" >{this.state.productData.name}</div>
                                <div className="category" >{this.state.productData.category}</div>
                            </div>
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
                                        {this.state.productData.prices && this.state.productData.prices.filter((price) =>{return price.currency === this.props.currency}).map((el) =>{
                                            return (
                                                <div className="price">{Math.round(el.amount)} {el.currency}</div>

                                            )

                                        })}
                            </div>
                            <CartButton data={this.state.productData} img={false} />
                            <div>
                                <div className="productDescribe">describe:</div>
                                <div dangerouslySetInnerHTML={{ __html: this.state.productData.description}}></div>
                            </div>
                        </div>
                    </div>
                </Loader>
            );
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter( ProductPage)) ;