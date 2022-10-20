import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import CartButton from '../../components/CartButton';
import GetCurrency from '../../components/GetCurrency';
import { PRODUCT_PAGE } from '../../serialzie/routes';
import { serializeAttributes } from '../../serialzie/serialize';

class CardProduct extends Component {
    constructor() {
        super()

        this.state = {
            attributes: [],
        };
    }
    componentDidMount() {
        this.setState({attributes: serializeAttributes(this.props.data.attributes)})
    }
    
    render() {
            return (
                <div className="cardCont">
                    <Link className="a" to={PRODUCT_PAGE.replace(":id", this.props.data.id)} >
                        <div className="inCardCont" >
                                <img className="img" src={this.props.data.gallery[0]} alt={this.props.name} />
                                {this.props.data.inStock ? <></> : <div className="inStock" >out of stock</div> }
                            <div className="title">{this.props.data.name}</div>
                            <GetCurrency prices={this.props.data.prices} />
                        </div>
                    </Link>
                    {this.props.data.inStock ? <CartButton attributes={this.state.attributes} data={this.props.data} img={true}/> : <></> }
                </div>
            );
    }
}

export default (withRouter(CardProduct));