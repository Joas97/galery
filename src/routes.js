import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './Components/App';
import Login from './Components/Login';
import Home from './Components/Home';
import Images from './Components/Images';
import Page404 from './Components/Page404';

const AppRoutes = () => 
	<App>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/Login" component={Login}/>
			<Route exact path="/Images" component={Images} />
			<Route exact component={Page404} />
		</Switch>
	</App>;

export default AppRoutes;
