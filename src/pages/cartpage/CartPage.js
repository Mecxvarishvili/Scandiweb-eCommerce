import React, { Component } from 'react';
import { getCartData } from '../../store/cart/cartSelector';
import { connect } from 'react-redux';
import { getProductsCurrency } from '../../store/products/productsSelector';
import CartQuantity from '../../components/CartQuantity';
import GetCurrency from '../../components/GetCurrency';
import SetCartImage from './SetCartImage';
import SelectedAttributes from '../../components/SelectedAttributes';

const mapStateToProps = (props) => ({
    getCartData: getCartData(props),
    getCurrency: getProductsCurrency(props)
 });

class CartPage extends Component {

    render() {
        return (
            <div className="cartPage">
                <div className="title">Cart</div>
                <div className="productsCont">
                    {this.props.getCartData.length
                    ?
                    this.props.getCartData.map((el, ) => {
                        return (
                            <div key={el.newId}>
                                <div className="line" ></div>
                                <div className="productBox" >
                                    <div className="cont1">
                                        <div>
                                            <div className="name" >{el.name}</div>
                                            <div className="category" >{el.category}</div>
                                            <GetCurrency prices={el.prices} />
                                        </div>
                                        <div className="attributesCont">
                                            <SelectedAttributes data={el}/>
                                        </div>
                                    </div>
                                    <div className="cont2">
                                        <div className="qtyBox">
                                            <CartQuantity data={el} />
                                        </div>
                                        <div className="imgBox">
                                            <SetCartImage gallery={el.gallery} id={el.id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
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