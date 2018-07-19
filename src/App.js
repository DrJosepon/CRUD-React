import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Link
} from 'react-router-dom';

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homePage';
import Products from './components/pages/products';
import Login from './components/pages/login';
import Courses from './components/pages/courses';

import ReadOneProductComponent from './components/pages/read_one_product';
import CreateProductComponent from './components/pages/create_product';
import DeleteProductComponent from './components/pages/delete_product';
import UpdateProductComponent from './components/pages/update_product';

//includes
import './Assets/css/custom.min.css';

const Coursez = ({ match }) => (
  <div>
     <ul>
        <li><Link to={`${match.url}/technology`}>Technology</Link></li>
        <li><Link to={`${match.url}/business`}>Business</Link></li>
        <li><Link to={`${match.url}/economics`}>Economics</Link></li>
    </ul>

    <Route exact path={`${match.path}/technology`} render={() => (<div> This is technology </div>)}/>
    <Route path={`${match.path}/business`} component={() => (<div> This is business </div>)}/>
    <Route path={`${match.path}/economics`} component={() => (<div> This is economics </div>)}/>
  </div>
);

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

          <Route path="/airports"   render={() => (<div> This is the airport route </div>)}/>
 
          <Route path="/courses" component={Courses}/>

          <Route path="/coursez" component={Coursez}/>

          <Footer />

        </div>
      </Router>
    );
  }
}

export default App;
