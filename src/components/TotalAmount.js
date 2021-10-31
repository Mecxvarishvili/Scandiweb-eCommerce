import { Component } from 'react';
import { connect } from 'react-redux';
import { getCartData } from '../store/cart/cartSelector';
import { getProductsCurrency } from '../store/products/productsSelector';

const mapStateToProps = (props) => ({
    getCartData: getCartData(props),
    getCurrency: getProductsCurrency(props)
 });

class TotalAmount extends Component {

    render() {
        const amountArray = this.props.getCartData.map(el => {
            return el.prices.filter((price) =>{ return price.currency === this.props.getCurrency}).map((el) =>{
                return el.amount
            })
        })
    
        var amount = 0
    
        for (var i = 0; i < amountArray.length; i++){
            for (var a = 0; a < 1; a++) {
            amount += amountArray[i][a] * this.props.getCartData[i].qty;
            }
        }
        return (amount.toFixed(2))
    }
}

export default connect(mapStateToProps)(TotalAmount);