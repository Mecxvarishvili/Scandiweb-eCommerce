import React, { Component } from 'react';
import Footer from './layout/footer/Footer';
import Header from './layout/header/Header';
import ProductPage from "./pages/productpage/ProductPage"
import "./App.css"
import CategoryPage from './pages/categorypage/CategoryPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CART_PAGE, CATEGORY_PAGE, PRODUCT_PAGE } from './serialzie/routes';
import { createStore } from 'redux';
import rootReducer from './store/rootReducer';
import CartPage from './pages/cartpage/CartPage';

const store = createStore(rootReducer);
class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="cont" >
          <Router>
            <Header />
            <Switch>
              <Route path={CATEGORY_PAGE} exact component={CategoryPage} />
              <Route path={CART_PAGE} component={CartPage} />
              <Route path={PRODUCT_PAGE} component={ProductPage} />
            </Switch>
            <Footer />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;