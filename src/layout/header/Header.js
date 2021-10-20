import React, { Component } from 'react';
import logo from "../../images/logo.png"
import cart from "../../images/Cart.png"
import { Link } from 'react-router-dom';
import { ALLPRODUCTS_PAGE, CART_PAGE, CATEGORY_PAGE, PRODUCT_PAGE } from '../../serialzie/routes';
import { CATEGORIES_QUERY } from '../../serialzie/querySerialize';
import { SetCurrency } from '../../store/products/productsActionCreator';
import { connect } from 'react-redux';
import { getCartData } from '../../store/cart/cartSelector';
import { getProductsCurrency } from '../../store/products/productsSelector';
import { withRouter } from 'react-router';

const mapStateToProps = (props) => ({
    getCartData: getCartData(props),
    getCurrency: getProductsCurrency(props)
 });

const mapDispatchToProps = (dispatch) => {
    return {
        setCur: (data) => dispatch(SetCurrency(data))
    }
}

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            isLoading: true,
            cartMenu: "dontShowCart",
            cartMenuCont: "dontShowCartMenuCont"
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({query: CATEGORIES_QUERY})
        })
            .then(res => res.json())
            .then(data => this.setState({data: data.data.categories}))
            .then(this.setState({isLoading: false}))
    }

    selectCurrency = (e) => {
        this.props.setCur(e.target.value)
    }

    setCartClass() {
        if(this.state.cartMenu === "showCart") {
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

    render() {
        const amountArray = this.props.getCartData.map(el => {
            return el.prices.filter((price) =>{ return price.currency === this.props.getCurrency}).map((el) =>{
                return Math.round(el.amount)
            })
        })
    
        var amount = 0
    
        for (var i = 0; i < amountArray.length; i++){
            for (var a = 0; a < 1; a++) {
            amount += amountArray[i][a];
            }
        }
        return (
            <header>
                <div className="inHeader">
                    <div className="headerCont">
                        <div className="categoryCont">
                            {this.state.data && this.state.data.map((el, index) =>{
                                return(
                                    <Link to={CATEGORY_PAGE.replace(":id", el.name)} key={index} >
                                        <div className={this.setCategoryClass(CATEGORY_PAGE.replace(":id", el.name))} onClick={() => this.setState({cartMenuCont: "dontShowCartMenuCont"})} >{el.name}</div>
                                    </Link>
                                )
                            })}
                            <Link to={ALLPRODUCTS_PAGE}>
                                <div className={"category", this.setCategoryClass(ALLPRODUCTS_PAGE)} onClick={() => this.setState({cartMenuCont: "dontShowCartMenuCont"})} >All</div>
                            </Link>
                        </div>
                        <div className="logoCont">
                            <img className="logo" src={logo} alt="logo" />
                        </div>
                        <div className="cont1">
                            <div className="currencyCont" >
                                <select onChange={(e) => this.selectCurrency(e)} >
                                    <option value="USD" >$ USD</option>
                                    <option value="GBP" >£ GBP</option>
                                    <option value="AUD" >$ AUD</option>
                                    <option value="JPY" >¥ JPY</option>
                                    <option value="RUB" >₽ RUB</option>
                                </select>
                            </div>
                            <button onClick={() => this.setCartClass()} >
                                    <img className="cart" src={cart} alt="cart" />
                                    {!!this.props.getCartData.length ? <div>{this.props.getCartData.length}</div> : <></>}
                            </button>
                        </div>
                        <div  className={this.state.cartMenuCont}  onClick={() => this.setCartClass()}>
                            <div className="cartCont" >
                                <div className={this.state.cartMenu} >
                                    <div className="bagTitle" >My Bag, <span>{this.props.getCartData.length} items</span></div>
                                    {!!this.props.getCartData.length 
                                    ?
                                    <>
                                        <div className="bagCardCont" >
                                            {this.props.getCartData.map((el) => {
                                                return (
                                                    <div className="bagCardBox" >
                                                        <div className="leftCont" >
                                                            <div className="bagDescribe" >
                                                                <div className="bagName" >{el.name}</div>
                                                                <div className="bagCategory">{el.category}</div>
                                                                <div className="bagPrice">
                                                                {el.prices.filter((price) =>{return price.currency === this.props.getCurrency}).map((el) =>{
                                                                    return (
                                                                        <div className="price">{Math.round(el.amount)} {el.currency}</div>
                                                                    )
                                                                })}
                                                                </div>
                                                            </div>
                                                            <div className="bagSizeCont" >
                                                                <div className="bagSizeBox" >S</div>
                                                                <div className="bagSizeBox" >M</div>

                                                            </div>
                                                        </div>
                                                        <div className="rightCont" >
                                                            <div className="qtyCont" ></div>
                                                            <div className="imgCont" >
                                                                <Link to={PRODUCT_PAGE.replace(":id", el.id)} >
                                                                    <img src={el.gallery[0]} />
                                                                </Link> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                    :
                                    <div className="emptyBag" >Bag is Empty</div>
                                    }
                                    <div className="totalCont" >
                                        <div className="total" >Total</div>
                                        <div className="totalPrice" >{amount} {this.props.getCurrency}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));