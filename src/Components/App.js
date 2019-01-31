import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Content from './Content';

class App extends Component {

	render() {
		const { children } = this.props;
    	
		return (
			<Fragment>
				<Content body={children}/>
	        </Fragment>
		);
	}
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
