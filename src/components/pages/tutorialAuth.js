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

  const Home = () => (
    <div>
      <h2>Home Page</h2>
    </div>
  );
  
  const Contact = () => (
    <div>
      <h2>Contact Page</h2>
    </div>
  );
  
  const CustomLink = ({ children, to, exact }) => (
    <Route path={to} exact={exact} children={({ match }) => (
      <div className={match ? 'active' : ''}>
        {match ? '> ' : ''}
        <Link to={to}>
          {children}
        </Link>
      </div>
    )}/>
  );


  const routes = [
    { path: '/',
      exact: true,
      leftbar: () => <div>Home</div>,
      main: () => <h2>Home</h2>
    },
    { path: '/about',
      leftbar: () => <div>About</div>,
      main: () => <h2>About</h2>
    },
    { path: '/contact',
      leftbar: () => <div>Contact</div>,
      main: () => <h2>Contact</h2>
    }
  ]

class TutorialAuth extends Component {
 
  render() {
    return (
        <Router> 
        <div className="App">

 <div style={{ display: 'flex' }}>
        <div style={{
          padding: '10px',
          width: '40%',
          background: '#FF6347'
        }}>
          <ul style={{ listStyleType: 'none' }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.leftbar}
            />
          ))}
        </div>

        <div style={{ flex: 1, padding: '20px' }}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </div>

          <AuthStatusz />
          <ul>
            <li><Link to='/publicz'> Public </Link></li>
            <li><Link to='/privatez'> Private </Link></li>
          </ul>

             <CustomLink exact={true} to="/">
              Home
            </CustomLink>
            <CustomLink to="/contact">
              Contact
            </CustomLink>

          <Route path="/coursez" component={Coursez}/>

          <Route path='/publicz' component={Publicz} />
          <Route path="/loginz" component={Loginz}/>
          <SecretRoutez path='/privatez' component={Privatez} />

             <Route exact path="/" component={Home}/>
          <Route path="/contact" component={Contact}/>

        </div>
      </Router>
    );
  }
}

export default TutorialAuth;
