import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Link,
  Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router';
import { SecretRoute, AuthStatus } from  './services/authService';

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homePage';
import Products from './components/pages/products';
import Courses from './components/pages/courses';
import TutorialAuth from './components/pages/tutorialAuth';
import Login from './components/pages/login';

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

          <AuthStatus/>

          <Route exact path='/' component={Homepage} />

          <SecretRoute exact path='/Products' component={Products} />

          <Route exact path='/ReadOneProductComponent/:productId' component={ReadOneProductComponent} />

          <Route exact path='/CreateProductComponent' component={CreateProductComponent} />
 
          <Route exact path='/DeleteProductComponent/:productId' component={DeleteProductComponent} />

          <Route exact path='/UpdateProductComponent/:productId' component={UpdateProductComponent} />

          <Route path="/airports"   render={() => (<div> This is the airport route </div>)}/>
 
          <Route path="/courses" component={Courses}/> 

          <Route path="/TutorialAuth" component={TutorialAuth}/> 
          
          <Route path="/Login" component={Login}/> 

          <Footer />

        </div>
      </Router>
    );
  }
}

export default App;
