import React, { Component } from 'react';
import Products from "./CardProduct"

class CategoryPage extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="categoryPage" >
                <div className="categoryname">Category name</div>
                <div className="cards">
                    <Products />
                </div>
            </div>
        );
    }
}

export default CategoryPage;