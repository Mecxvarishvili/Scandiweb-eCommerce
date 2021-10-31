import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductsCurrency } from '../store/products/productsSelector';

const mapStateToProps = (props) => ({
    getCurrency: getProductsCurrency(props),
 });

class GetCurrencySymbol extends Component {

    getSymbol(currency) {
        switch(currency) {
            case "USD":
                return "$"
            case "GBP":
                return "£"
            case "AUD":
                return "$"
            case "JPY":
                return "¥"
            case "RUB":
                return "₽"
            default: 
                return "$"
        }
    }

    render() {
        if(!!this.props.prices) {
            return (
                this.props.prices.filter((price) =>{return price.currency === this.props.getCurrency}).map((el, index) =>{
                    return (
                        <div className="price" key={index}>{el.amount.toFixed(2)} {this.getSymbol(el.currency)}</div>
                    )
                })
            )
        } else {
            return (
                this.getSymbol(this.props.getCurrency)
            );

        } 
    }
}

export default connect(mapStateToProps)(GetCurrencySymbol);