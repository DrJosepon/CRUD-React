import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Link,
  Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router';


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

  
const Publicz = () => (
    <div> This is a public page </div>
  );
  
  const Privatez = () => (
    <div> This is a private page </div>
  );
   
  
  const AuthServicez = {
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
  
  const SecretRoutez = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      AuthServicez.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/loginz',
            state: { from: props.location }
          }} />
    )} />
  );
  
  const AuthStatusz = withRouter(({ history }) => (
    AuthServicez.isAuthenticated ? (
      <p>
        Welcome! <button onClick={() => {
          AuthServicez.logout(() => history.push('/'))
        }}>Sign out</button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
  ));
  
  class Loginz extends React.Component {
    state = {
      redirectToPreviousRoute: false
    };
  
    login = () => {
      AuthServicez.authenticate(() => {
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
  

class TutorialAuth extends Component {
 
  render() {
    return (
        <Router>
        <div className="App">
 

          <AuthStatusz />
          <ul>
            <li><Link to='/publicz'> Public </Link></li>
            <li><Link to='/privatez'> Private </Link></li>
          </ul>

          <Route path="/coursez" component={Coursez}/>

          <Route path='/publicz' component={Publicz} />
          <Route path="/loginz" component={Loginz}/>
          <SecretRoutez path='/privatez' component={Privatez} />
  
        </div>
      </Router>
    );
  }
}

export default TutorialAuth;
