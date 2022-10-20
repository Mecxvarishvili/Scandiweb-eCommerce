import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCartData } from '../../store/cart/cartSelector';
import { Link } from 'react-router-dom';
import { PRODUCT_PAGE } from '../../serialzie/routes';
import GetCurrency from '../../components/GetCurrency';
import CartQuantity from "../../components/CartQuantity"
import SelectedAttributes from '../../components/SelectedAttributes';

const mapStateToProps = (props) => ({
    getCartData: getCartData(props),
 });

class BagCard extends Component {

    setScroll() {
        if(this.props.getCartData.length > 2) {
            return "bagCardCont addScroll"
        } 
        return "bagCardCont"
    }

    render() {
        return (
            !!this.props.getCartData.length 
            ?
            <div className={this.setScroll()}>
                {this.props.getCartData.map((el) => {
                    return (
                        <div className="bagCardBox" key={el.newId} >
                            <div className="leftCont" >
                                <div className="bagDescribe" >
                                    <div className="bagName" >{el.name}</div>
                                    <div className="bagCategory">{el.category}</div>
                                    <div className="bagPrice">
                                        <GetCurrency prices={el.prices} />
                                    </div>
                                </div>
                                <div className="attributesCont" >
                                    <SelectedAttributes data={el}/>
                                </div>
                            </div>
                            <div className="rightCont" >
                                <div className="qtyBox" >
                                    <CartQuantity data={el} />
                                </div>
                                <div className="imgCont" >
                                    <Link onClick={() => this.props.dontShow()}  to={PRODUCT_PAGE.replace(":id", el.id)} >
                                        <img className="imgCont" src={el.gallery[0]}  alt="product"  />
                                    </Link> 
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            :
            <div className="emptyBag" >Bag is Empty</div>
        );
    }
}

export default connect(mapStateToProps)(BagCard);