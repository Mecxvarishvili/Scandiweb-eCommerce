import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductsCurrency } from '../store/products/productsSelector';

const mapStateToProps = (props) => ({
    getCurrency: Number(getProductsCurrency(props)),
 });

class GetCurrency extends Component {
    constructor() {
        super()

        this.state = {
            currency: 0,
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
            case 0:
                return "$"
            case 1:
                return "£"
            case 2:
                return "$"
            case 3:
                return "¥"
            case 4:
                return "₽"
            default: 
                return ""
        }
    }

    render() {
        if(!!this.props.prices) {
            return (
                <div className="price">{this.props.prices[this.state.currency].amount}{this.props.prices[this.state.currency].currency.symbol}</div>
            )
        } else {
             return (
                this.getSymbol(this.state.currency)
            );

        } 
    }
}

export default connect(mapStateToProps)(GetCurrency);