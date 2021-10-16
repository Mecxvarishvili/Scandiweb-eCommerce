import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { CATEGORY_QUERY } from '../../serialzie/querySerialize';
import { PRODUCT_PAGE } from '../../serialzie/routes';

class Products extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            data: [],
            call: "as",
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
            this.state.data.map((el, index)=> {
                return (
                    <Loader loader={this.state.isLoading}>
                        <div className="cardCont" key={index}>
                            <Link to={PRODUCT_PAGE.replace(":id", el.id)} >
                                <img src={el.gallery[0]} />
                            </Link>
                            <div className="title">{el.name}</div>
                            <div className="price" >${Math.round(el.prices[0].amount)}</div>
                        </div>
                    </Loader>
                )
            })
        );
    }
}

export default Products;