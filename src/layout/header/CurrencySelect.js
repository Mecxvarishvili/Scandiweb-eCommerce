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
                <select defaultValue={localStorage.getItem("Currency")} onChange={(e) => this.selectCurrency(e)} >
                    <option value="0" >$ USD</option>
                    <option value="1" >£ GBP</option>
                    <option value="2" >$ AUD</option>
                    <option value="3" >¥ JPY</option>
                    <option value="4" >₽ RUB</option>
                </select>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(CurrencySelect);