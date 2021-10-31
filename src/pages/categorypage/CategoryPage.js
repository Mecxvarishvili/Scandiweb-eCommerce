import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { ALLPRODUCTS_PAGE } from '../../serialzie/routes';
import CardProducts from "./CardProduct"
import Api from '../../serialzie/api';
import Loader from '../../components/Loader';

class CategoryPage extends Component {
    constructor() {
        super()

        this.state = {
            isLoading: true,
            data: [],
            pathname: '',
        };
    }

    getProducts() {
            this.setState({isLoading: true})
            Api.fetchCategoryProduct(this.props.location.pathname === ALLPRODUCTS_PAGE ? "" : this.props.match.params.id)
                .then(data => this.setState({data: data.data.category.products}))
                .then(this.setState({pathname: this.props.location.pathname}))
                .finally(this.setState({isLoading: false}))
    }

    componentDidMount() {
        this.getProducts()
    }

    componentDidUpdate() {
        if(this.state.pathname !== this.props.location.pathname) {
            this.getProducts()
            
        }
        
    }

    render() {
        return (
            <div className="categoryPage" >
                <div className="categoryname">{this.props.location.pathname === ALLPRODUCTS_PAGE ? "all  product" : this.props.match.params.id}</div>
                <div className="cards">
                <Loader loader={this.state.isLoading} >
                        {this.state.data.map((el)=> {
                            return (
                            <CardProducts data={el} key={el.id} />
                        )
                    })}
                </Loader>
                </div>
            </div>
        );
    }
}

export default withRouter(CategoryPage);