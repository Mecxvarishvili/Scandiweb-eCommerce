import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductsCurrency } from '../store/products/productsSelector';

const mapStateToProps = (props) => ({
    getCurrency: getProductsCurrency(props),
 });

class GetCurrency extends Component {
    constructor() {
        super()
        this.state = {
            price: 0,
            currency: ""
        }
    }

    getPrice() {
        if(this.props.prices && this.props.getCurrency) {
            const price = this.props.prices.find(price => price.currency.symbol === this.props.getCurrency)
            this.setState({currency: this.props.getCurrency, price: price.amount})
        }
    }
    
    componentDidMount() {
        this.getPrice()
    }

    componentDidUpdate() {
        if(this.state.currency !== this.props.getCurrency) {
            this.getPrice()
        }
    }

    render() {
        return (
            <div className="price">{this.state.price.toFixed(2)}{this.state.currency}</div>
        )
    }
}

export default connect(mapStateToProps)(GetCurrency);