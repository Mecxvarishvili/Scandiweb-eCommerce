import React, { Component } from 'react';
import Header from './layout/header/Header';
import ProductPage from "./pages/productpage/ProductPage"
import "./App.css"
import CategoryPage from './pages/categorypage/CategoryPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CART_PAGE, CATEGORY_PAGE, ALLPRODUCTS_PAGE, PRODUCT_PAGE } from './serialzie/routes';
import CartPage from './pages/cartpage/CartPage';
import { connect } from 'react-redux';
import { SetCurrency, setDataEndPoints } from './store/products/productsActionCreator';
import { SetLocalStorageData } from './store/cart/cartActionCreator';
import { getCartData } from './store/cart/cartSelector';
import { memo } from 'react';
import Api from './serialzie/api';
import { serializeEndPoints } from './serialzie/serialize';

const mapStateToProps = (props) => ({
  getCart: getCartData(props)
});

const mapDispatchToProps = (dispatch) => {
  return {
      setCurrency: (data) => dispatch(SetCurrency(data)),
      setCartData: (data) => dispatch(SetLocalStorageData(data)),
      setDataEndPoint: (data) => dispatch(setDataEndPoints(data))
  }
}

class App extends Component {

  componentDidMount() {

    Api.fetchCategoryProduct('')
      .then(data => this.props.setDataEndPoint(serializeEndPoints(data.data.category.products)) /* serializeEndPoints(data.data.category.products) */)
    this.props.setCurrency(localStorage.getItem("Currency"))
    if(localStorage.getItem("CartData") && localStorage.getItem("CartData").length) {
      this.props.setCartData(JSON.parse(localStorage.getItem("CartData")))
    }
    
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.getCart !== this.props.cartData) {
      localStorage.setItem("CartData", JSON.stringify(this.props.getCart))
    }

  }
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(App));