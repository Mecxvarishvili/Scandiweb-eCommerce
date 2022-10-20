import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { ALLPRODUCTS_PAGE } from '../../serialzie/routes';
import CardProduct from "./CardProduct"
import Api from '../../serialzie/api';
import Loader from '../../components/Loader';
import { CATEGORY_PAGE } from '../../serialzie/routes';
import ProductsFilter from './ProductsFilter';
import { serializeFilteredProducts, serializeFilterParams } from '../../serialzie/serialize';

class CategoryPage extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            data: [],
            pathname: '',
            category: '',
            filterParams: serializeFilterParams((new URL(document.location)).searchParams),
            filteredProduct: [],
            openBar: 'closeBar',
        };
    }

    getProducts() {
            this.setState({isLoading: true})
            Api.fetchCategoryProduct(this.props.location.pathname === ALLPRODUCTS_PAGE ? "" : this.props.match.params.id)
                .then(data => this.setState({data: serializeFilteredProducts(data.data.category.products, this.state.filterParams), isLoading: false}))
                .then(this.setState({
                    pathname: this.props.location.pathname,
                    filterParams: serializeFilterParams((new URL(document.location)).searchParams),
                    search: this.props.location.search
                }))
    }

    componentDidMount() {
        this.getProducts()
        if (this.props.location.pathname === "/") {
            this.setState({category: this.props.location.pathname})

        } else {
            this.setState({category: this.props.match.params.id})
        }
    }

    componentDidUpdate() {
        if(this.state.pathname !== this.props.location.pathname || this.state.search !== this.props.location.search) {
            this.getProducts()
        
            if (this.props.location.pathname === "/") {
                this.setState({category: this.props.location.pathname})
    
            } else {
                this.setState({category: this.props.match.params.id})
            }
            
        }
    }

    handleChange(e) {
        if(e.target.value === '/') {
            this.props.history.push('/')

        } else {
            this.props.history.push(CATEGORY_PAGE.replace(":id", e.target.value))

        }
    }

    handleOpenBar() {
        if(this.state.openBar === "closeBar") {
            this.setState({openBar: "openBar"})
        } else {
            this.setState({openBar: "closeBar"})
        }

    }
    
    render() {
        return (
            <div className="categoryPage" >
                <div className="categoryname">{this.props.location.pathname === "/" ? "all  product" : this.props.match.params.id}</div>
                <div className='mainCont' >
                    <div className="filterCont">
                        <div className="filterTop" >
                            <div className="filterTitle">Products filter</div>
                            <div className="menuIcon"  onClick={() => this.handleOpenBar()}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div className={this.state.openBar} >
                            <div className="categorySelect">
                                <select className='select' onChange={(e) => this.handleChange(e)} value={this.state.category} >
                                    <option value="/"  >All Products</option>
                                    <option value="tech"  >Tech</option>
                                    <option value="clothes"  >Clothes</option>
                                </select>
                            </div>
                            {this.props.location.pathname === "/"  ? 
                            <div className="notSelected" >Select Category to Filter </div>
                            :
                            <ProductsFilter attr={""} />
                            
                            }
                        </div>
                    </div>
                    <Loader loader={this.state.isLoading}>
                        <div className="cards">
                        {this.state.data.length ?
                                this.state.data.map((el)=> {
                                    return (
                                    <CardProduct data={el} key={el.id} />
                                )
                            })
                        :
                            <div className='noData' >
                                <div>Products not found</div>
                            </div>
                        }
                        </div>
                    </Loader>
                </div>
            </div>
        );
    }
}

export default withRouter(CategoryPage);