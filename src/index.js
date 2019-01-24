import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './Components/App';
// import * as serviceWorker from './serviceWorker';

render(
	<App />, 
	document.getElementById('body')
);

// serviceWorker.unregister();
