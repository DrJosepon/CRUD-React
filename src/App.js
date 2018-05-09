import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homePage';
import Products from './components/pages/products';

import ReadOneProductComponent from './components/pages/read_one_product';
import CreateProductComponent from './components/pages/create_product';
import DeleteProductComponent from './components/pages/delete_product';
import UpdateProductComponent from './components/pages/update_product';

//includes
import './Assets/css/custom.min.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <Header />

          <Route exact path='/' component={Homepage} />

          <Route exact path='/Products' component={Products} />

          <Route exact path='/ReadOneProductComponent/:productId' component={ReadOneProductComponent} />

          <Route exact path='/CreateProductComponent' component={CreateProductComponent} />
 
          <Route exact path='/DeleteProductComponent/:productId' component={DeleteProductComponent} />

          <Route exact path='/UpdateProductComponent/:productId' component={UpdateProductComponent} />

          <Footer />

        </div>
      </Router>
    );
  }
}

export default App;
