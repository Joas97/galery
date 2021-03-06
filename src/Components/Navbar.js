import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

class NavBar extends Component {

	handleClose = () => {
		localStorage.setItem('session', false);
		window.location.href = '/Login';
  	};

	render() {
		return (
			<AppBar position="static" color="primary" style={{position: 'relative'}}>
	          <Toolbar>
	            <Typography variant="h6" color="inherit" noWrap style={{'flexGrow': 1}}>
	              Gallery
	            </Typography>
	            <Button color="inherit" onClick={this.handleClose}>Logout</Button>
	          </Toolbar>
	        </AppBar>
		)
	}
}

export default NavBar;