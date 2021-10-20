import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { CATEGORY_QUERY } from '../../serialzie/querySerialize';
import { ALLPRODUCTS_PAGE, PRODUCT_PAGE } from '../../serialzie/routes';
import { getProductsCurrency } from '../../store/products/productsSelector';
import { withRouter } from 'react-router';
import Cart from "../../images/WhiteCart.png"
import { DeleteCart, setCart } from '../../store/cart/cartActionCreator';
import { getCartData } from '../../store/cart/cartSelector';
import CartButton from '../../components/CartButton';

const mapStateToProps = (props) => ({
    currency: getProductsCurrency(props),
    getCartData: getCartData(props),
 });
 
const mapDispatchToProps = (dispatch) => {
    return {
        setCartData: (data) => dispatch(setCart(data)),
        deleteCartData: (data) => dispatch(DeleteCart(data)),
    }
}

class CardProducts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            data: [],
        };
    }

    componentDidMount() {
        this.setState({isLoading: true})
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({query: CATEGORY_QUERY})
        })
            .then(res => res.json())
            .then(data => this.setState({data: data.data.category.products}))
            .finally(this.setState({isLoading: false}))

    }
    
    render() {
            return (
                <Loader>
                    {
                        this.props.location.pathname === ALLPRODUCTS_PAGE ?
                        this.state.data.map((el, index)=> {
                            return (
                                    <div className="cardCont" key={index}>
                                        <Link to={PRODUCT_PAGE.replace(":id", el.id)} >
                                            <img src={el.gallery[0]} />
                                        </Link>
                                        <div className="title">{el.name}</div>
                                        {el.prices.filter((price) =>{return price.currency === this.props.currency}).map((el) =>{
                                            return (
                                                <div className="price">{Math.round(el.amount)} {el.currency}</div>
                                            )
                                        })}
                                        <CartButton data={el} img={true}/>
                                    </div>
                            )
                        })
                        :
                        this.state.data.filter((data) =>{return data.category === this.props.match.params.id}).map((el, index) => {
                            return (
                                    <div className="cardCont" key={index}>
                                        <Link to={PRODUCT_PAGE.replace(":id", el.id)} >
                                            <img src={el.gallery[0]} />
                                        </Link>
                                        <div className="title">{el.name}</div>
                                        {el.prices.filter((price) =>{return price.currency === this.props.currency}).map((el) =>{
                                            return (
                                                <div className="price">{Math.round(el.amount)} {el.currency}</div>
                                            )
                                        })}
                                        <CartButton data={el} img={true}/>
                                    </div>
                            )
                        })

                    }
                </Loader>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardProducts));