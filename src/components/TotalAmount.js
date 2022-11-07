import { Component } from 'react';
import { connect } from 'react-redux';
import { getCartData } from '../store/cart/cartSelector';
import { getProductsCurrency } from '../store/products/productsSelector';

const mapStateToProps = (props) => ({
    getCartData: getCartData(props),
    getCurrency: getProductsCurrency(props)
 });

class TotalAmount extends Component {
    constructor() {
        super()
        this.state = {
            currency: "$",
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

    render() {
    
        var amount = 0
    
        if(this.props.getCurrency && this.props.getCartData) {
            const amountArray = this.props.getCartData.map(el => {
                return {price: el.prices.find(price => price.currency.symbol === this.props.getCurrency), qty: el.qty }
            })
        
            if(!!amountArray.length) {
                for(var i = 0; i < amountArray.length; i++){
                    amount += amountArray[i].price.amount * amountArray[i].qty
                }
            }
        }
        return (<>{amount.toFixed(2)} {this.props.getCurrency}</>)
    }
}

export default connect(mapStateToProps)(TotalAmount);