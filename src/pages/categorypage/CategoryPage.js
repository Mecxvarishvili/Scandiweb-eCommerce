import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { ALLPRODUCTS_PAGE } from '../../serialzie/routes';
import CardProducts from "./CardProduct"

class CategoryPage extends Component {

    render() {
        return (
            <div className="categoryPage" >
                <div className="categoryname">{this.props.location.pathname === ALLPRODUCTS_PAGE ? "all  product" : this.props.match.params.id}</div>
                <div className="cards">
                    <CardProducts />
                </div>
            </div>
        );
    }
}

export default withRouter(CategoryPage);