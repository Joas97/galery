import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const NavBar = () => {
	return (
		<AppBar position="absolute" color="primary" style={{position: 'relative'}}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Gallery
            </Typography>
          </Toolbar>
        </AppBar>
	)
}

export default NavBar;