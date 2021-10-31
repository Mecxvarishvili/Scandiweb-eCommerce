import React, { Component } from 'react';
import Header from './layout/header/Header';
import ProductPage from "./pages/productpage/ProductPage"
import "./App.css"
import CategoryPage from './pages/categorypage/CategoryPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CART_PAGE, CATEGORY_PAGE, ALLPRODUCTS_PAGE, PRODUCT_PAGE } from './serialzie/routes';
import CartPage from './pages/cartpage/CartPage';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="cont" >
          <Router>
            <Header />
            <Switch>
              <Route path={CATEGORY_PAGE} exact component={CategoryPage} />
              <Route path={ALLPRODUCTS_PAGE} exact component={CategoryPage} />
              <Route path={CART_PAGE} component={CartPage} />
              <Route path={PRODUCT_PAGE} component={ProductPage} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;