import React, { Component } from 'react';
import "./Header.css"
import logo from "../../images/logo.png"
import cart from "../../images/Cart.png"

class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="header">
                <div className="categoryCont">
                    <div className="category categoryAfter" >Women</div>
                    <div className="category" >Men</div>
                    <div className="category" >Kids</div>
                </div>
                <div className="">
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
                        <img className="cart" src={cart} alt="cart" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;