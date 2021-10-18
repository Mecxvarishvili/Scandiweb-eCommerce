import React, { Component } from 'react';
import logo from "../../images/logo.png"
import cart from "../../images/Cart.png"
import { Link } from 'react-router-dom';
import { CART_PAGE } from '../../serialzie/routes';

class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <header>
                <div className="categoryCont">
                    <div className="category categoryAfter" >Women</div>
                    <div className="category" >Men</div>
                    <div className="category" >Kids</div>
                </div>
                <div className="logoCont">
                    <img className="logo" src={logo} alt="logo" />
                </div>
                <div className="cont1">
                    <div>
                        <select>
                            <option>$ USD</option>
                            <option>€ EUR</option>
                            <option>￥JPY</option>
                        </select>
                    </div>
                    <div>
                        <Link to={CART_PAGE}>
                            <img className="cart" src={cart} alt="cart" />
                        </Link>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;