import React, { Component } from 'react';
import logo from "../../images/logo.png"
import cart from "../../images/Cart.png"
import { Link } from 'react-router-dom';
import { CART_PAGE, CATEGORY_PAGE } from '../../serialzie/routes';
import { connect } from 'react-redux';
import { getCartData } from '../../store/cart/cartSelector';
import { getProductsCurrency } from '../../store/products/productsSelector';
import { withRouter } from 'react-router';
import BagCard from './BagCard';
import TotalAmount from '../../components/TotalAmount';
import CurrencySelect from './CurrencySelect';

const mapStateToProps = (props) => ({
    getCartData: getCartData(props),
    getCurrency: getProductsCurrency(props)
 });


class Header extends Component {
    constructor() {
        super()

        this.state = {
            data: [],
            isLoading: true,
            cartMenu: "dontShowCart",
            cartMenuCont: "dontShowCartMenuCont",
            pathname: '',
        }
    }

    componentDidUpdate() {
        if(this.state.pathname !== this.props.location.pathname) {
            this.setState({
                cartMenuCont: "dontShowCartMenuCont",
                pathname: this.props.location.pathname
            })
        }
    }

    setCartClass() {
        if(this.state.cartMenuCont === "showCartMenuCont") {
            this.setState({cartMenu: "dontShowCart"})
            this.setState({cartMenuCont: "dontShowCartMenuCont"})
        } else {
            this.setState({cartMenu: "showCart"})
            this.setState({cartMenuCont: "showCartMenuCont"})
        }
    }

    setCategoryClass(pathname) {
        if (pathname === this.props.location.pathname) {
            return "categoryAfter"
        } else {
            return "category"
        }

    }

    dontShow() {
        this.setState({cartMenuCont: "dontShowCartMenuCont"})
    }

    render() {

        var totalQuantity = 0
        for(var i = 0; i < this.props.getCartData.length; i++) {
            totalQuantity += this.props.getCartData[i].qty

        }

        return (
            <header >
                <div className="inHeader" onClick={() => this.setState({cartMenuCont: "dontShowCartMenuCont"})}>
                    <div className="headerCont">
                        <div className="categoryCont">
                                    <Link to={CATEGORY_PAGE.replace(":id", "clothes")} key={"clothes"} >
                                        <div className={this.setCategoryClass(CATEGORY_PAGE.replace(":id", "clothes"))} >clothes</div>
                                    </Link>
                                    <Link to={CATEGORY_PAGE.replace(":id", "tech")} key={"tech"} >
                                        <div className={this.setCategoryClass(CATEGORY_PAGE.replace(":id", "tech"))} >tech</div>
                                    </Link>
                        </div>
                        <div className="logoCont">
                            <img className="logo" src={logo} alt="logo" />
                        </div>
                        <div className="cont1" >
                            <div className="inCont1" onClick={(e) => e.stopPropagation()}>
                                <CurrencySelect />
                                <button className="button" onClick={() => this.setCartClass()} >
                                        <img className="cart" src={cart} alt="cart" />
                                        {!!this.props.getCartData.length ? <div className="totalItem" >{totalQuantity}</div> : <></>}
                                </button>
                            </div>
                        </div>
                        <div className={this.state.cartMenuCont}>
                            <div className="cartCont"  >
                                <div className={this.state.cartMenu}  onClick={(e) => e.stopPropagation()}>
                                    <div className="bagTitle" >My Bag, <span>{this.props.getCartData.length} items</span></div>
                                    <BagCard dontShow={()=>this.setCartClass()} />
                                    <div className="totalCont" >
                                        <div className="total" >Total</div>
                                        <div className="totalPrice" >
                                            <TotalAmount />
                                        </div>
                                    </div>
                                    <div className="buttonCont" >
                                        <Link to={CART_PAGE}>
                                            <button className="viewBag" onClick={() => this.setCartClass()} >view bag</button>
                                        </Link>
                                        <button className="checkout" >checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>       
        );
    }
}

export default connect(mapStateToProps)(withRouter(Header));