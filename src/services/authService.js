import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route, 
    Link,
    Redirect
  } from 'react-router-dom';
import { withRouter } from 'react-router';

export const AuthService = {
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

export const SecretRoute = ({ component: Component, ...rest }) => (
<Route {...rest} render={(props) => (
    AuthService.isAuthenticated === true
    ? <Component {...props} />
    : <Redirect to={{
        pathname: '/Login',
        state: { from: props.location }
        }} />
)} />
);

export const AuthStatus = withRouter(({ history }) => (
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

