import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import App from './Components/App';
import Login from './Components/Login';
import Home from './Components/Home';
import RegisterImage from './Components/Images/RegisterImage';
import Image from './Components/Images/ListUser';
import Page404 from './Components/Page404';

const fakeAuth = {
  isAuthenticated: (localStorage.getItem('session') === "true")
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{ pathname: "/Login", state: { from: props.location }}} />
      }
    />
  );
}

const AppRoutes = () => 
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Login" component={Login}/>
      <PrivateRoute exact path="/Images" component={Image} />
      <Route exact path="/RegisterImage" component={RegisterImage}/>
      <Route exact component={Page404} />
    </Switch>
  </App>;

export default AppRoutes;

     