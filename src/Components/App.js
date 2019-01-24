import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Content from './Content';

class App extends Component {
	static propTypes = {
	    children: PropTypes.object.isRequired
	};

	render() {
		const { children } = this.props;
    
		return (
			<Fragment>
	            <Content body={children}/>
	        </Fragment>
		);
	}
}

export default App;
