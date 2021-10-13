import React, { Component } from 'react';
import Footer from './layout/footer/Footer';
import Header from './layout/header/Header';
import "./App.css"
import CategoryPage from './pages/categorypage/CategoryPage';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="cont" >
          <Header />
          <CategoryPage />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;