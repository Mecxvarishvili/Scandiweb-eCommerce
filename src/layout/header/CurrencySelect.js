import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SetCurrency } from '../../store/products/productsActionCreator';

const mapDispatchToProps = (dispatch) => {
    return {
        setCur: (data) => dispatch(SetCurrency(data))
    }
}

class CurrencySelect extends Component {

    
    selectCurrency = (e) => {
        this.props.setCur(e.target.value)
    }

    render() {
        return (
            <div className="currencyCont" >
                <select onChange={(e) => this.selectCurrency(e)} >
                    <option value="USD" >$ USD</option>
                    <option value="GBP" >£ GBP</option>
                    <option value="AUD" >$ AUD</option>
                    <option value="JPY" >¥ JPY</option>
                    <option value="RUB" >₽ RUB</option>
                </select>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(CurrencySelect);