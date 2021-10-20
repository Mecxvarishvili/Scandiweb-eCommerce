import React, { Component } from 'react';
import { getCartData } from '../../store/cart/cartSelector';
import { connect } from 'react-redux';
import { getProductsCurrency } from '../../store/products/productsSelector';
import CartQuantity from '../../components/CartQuantity';
import { Link } from 'react-router-dom';
import { PRODUCT_PAGE } from '../../serialzie/routes';


const mapStateToProps = (props) => ({
    getCartData: getCartData(props),
    getCurrency: getProductsCurrency(props)
 });

class CartPage extends Component {
    constructor() {
        super()

    }

    render() {
        return (
            <div className="cartPage">
                <div className="title">Cart</div>
                <div className="productsCont">
                    {this.props.getCartData.length
                    ?
                    this.props.getCartData.map((el, index) => {
                        return (
                            <>
                                <div className="line" ></div>
                                <div key={index} className="productBox" >
                                    <div className="cont1">
                                        <div>
                                            <div className="name" >{el.name}</div>
                                            <div className="category" >{el.category}</div>
                                            {el.prices.filter((price) =>{return price.currency === this.props.getCurrency}).map((el) =>{
                                                return (
                                                    <div className="price">{Math.round(el.amount)} {el.currency}</div>

                                                )
                                            })}
                                        </div>
                                        <div className="cartCategory">
                                            <div>S</div>
                                            <div>M</div> {/* not working */}
                                        </div>
                                    </div>
                                    <div className="cont2">
                                        <div className="qtyBox">
                                            <CartQuantity />
                                        </div>
                                        <div className="imgBox">
                                            <Link to={PRODUCT_PAGE.replace(":id", el.id)} >
                                                <img src={el.gallery[0]} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                    :
                    <div className="emptyCart" >Cart is empty</div>
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CartPage);