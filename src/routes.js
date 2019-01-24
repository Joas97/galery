import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './Components/App';
import Login from './Components/Login/index';
import Home from './Components/Home';
import Page404 from './Components/Page404';

const AppRoutes = () => 
	<App>
		<Switch>
			<Route exact path="/" component={Login} />
			<Route exact path="/Home" component={Home} />
			<Route exact component={Page404} />
		</Switch>
	</App>;

export default AppRoutes;