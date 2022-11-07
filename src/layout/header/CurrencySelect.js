import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SetCurrency } from '../../store/products/productsActionCreator';
import { getCurrencyEndPoints } from '../../store/products/productsSelector';

const mapStateToProps = (props) => ({
    getCur: getCurrencyEndPoints(props)
})

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
                {!!this.props.getCur.length && <select defaultValue={localStorage.getItem("Currency")} onChange={(e) => this.selectCurrency(e)} >
                    {this.props.getCur && this.props.getCur.map(el => (
                        <option key={el.label} value={el.symbol} >{el.symbol} {el.label}</option>
                    ))}
                </select>}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);