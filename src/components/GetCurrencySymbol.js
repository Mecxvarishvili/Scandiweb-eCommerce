import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductsCurrency } from '../store/products/productsSelector';

const mapStateToProps = (props) => ({
    getCurrency: getProductsCurrency(props),
 });

class GetCurrencySymbol extends Component {
    constructor() {
        super()

        this.state = {
            currency: "",
        }
    }
    componentDidMount() {
        this.setState({currency: this.props.getCurrency})
    }

    componentDidUpdate() {
        if(this.state.currency !== this.props.getCurrency) {
            this.setState({currency: this.props.getCurrency})
        }
    }

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
                return ""
        }
    }

    render() {
        if(!!this.props.prices) {
            return (
                this.props.prices.filter((price) =>{return price.currency === this.state.currency}).map((el, index) => {
                    return (
                        <div className="price" key={index}>{el.amount.toFixed(2)} {this.getSymbol(el.currency)}</div>
                    )
                })
            )
        } else {
            return (
                this.getSymbol(this.state.currency)
            );

        } 
    }
}

export default connect(mapStateToProps)(GetCurrencySymbol);