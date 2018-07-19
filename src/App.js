import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Link,
  Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router';

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homePage';
import Products from './components/pages/products';
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

const Public = () => (
  <div> This is a public page </div>
);

const Private = () => (
  <div> This is a private page </div>
);

// const Login = () => (
//   <div> Login Page <button>login</button> </div>
// );

const AuthService = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  logout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const SecretRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthService.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
);

const AuthStatus = withRouter(({ history }) => (
  AuthService.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        AuthService.logout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
));

class Login extends React.Component {
  state = {
    redirectToPreviousRoute: false
  };

  login = () => {
    AuthService.authenticate(() => {
      this.setState({ redirectToPreviousRoute: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToPreviousRoute } = this.state;

    if (redirectToPreviousRoute) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
};



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <Header />

          <AuthStatus />
          <ul>
            <li><Link to='/public'> Public </Link></li>
            <li><Link to='/private'> Private </Link></li>
          </ul>

          <Route exact path='/' component={Homepage} />

          <Route exact path='/Products' component={Products} />

          <Route exact path='/ReadOneProductComponent/:productId' component={ReadOneProductComponent} />

          <Route exact path='/CreateProductComponent' component={CreateProductComponent} />
 
          <Route exact path='/DeleteProductComponent/:productId' component={DeleteProductComponent} />

          <Route exact path='/UpdateProductComponent/:productId' component={UpdateProductComponent} />

          <Route path="/airports"   render={() => (<div> This is the airport route </div>)}/>
 
          <Route path="/courses" component={Courses}/>

          <Route path="/coursez" component={Coursez}/>

           <Route path='/public' component={Public} />
          <Route path="/login" component={Login}/>
          <SecretRoute path='/private' component={Private} />

          <Footer />

        </div>
      </Router>
    );
  }
}

export default App;
