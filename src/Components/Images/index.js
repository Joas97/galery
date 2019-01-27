import React, { Component, Fragment } from 'react';
import Navbar from '../Navbar';
import { Grid, TextField, Button, Typography }from '@material-ui/core';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(500 + theme.spacing.unit * 2 * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  }
});

class Images extends Component{
	constructor () {
		super();
		this.state = {
			"name": '',
			"email": '',
			"review": '',
			"facebook": '',
			"image": []
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = event => {
		event.preventDefault();
		const files = Array.from(this.state.image)
		const formData = new FormData();
		files.forEach((file, i) => {
	      formData.append(i, file)
	    });
		console.log(formData);
	}


	handleInputChange = event => {
		console.log(event.target.value);
		this.setState({
	      [event.target.id]: event.target.value
	    });
	}


	render(){
		const { classes } = this.props;
   
		return(
			<Fragment>
				<Navbar />
				<main className={classes.layout}>
			        <Paper className={classes.paper}>
						<form onSubmit={this.handleSubmit}>
					    	<Typography component="h1" variant="h4" align="center">
				              Register Image
				            </Typography>
							<Grid container spacing={24}>
								<Grid item xs={12} sm={12}>
									<TextField 
										required 
										id="name" 
										label="Name" 
										value={this.state.name}  
										onChange={this.handleInputChange} 
										fullWidth
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField 
										required 
										id="email" 
										label="Email" 
										value={this.state.email}  
										onChange={this.handleInputChange} 
										fullWidth
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField 
										required 
										id="facebook" 
										label="Facebook" 
										value={this.state.facebook}  
										onChange={this.handleInputChange} 
										fullWidth
									/>
								</Grid>
								<Grid item xs={9} sm={10}>
									<TextField 
										required
										multiline 
										rowsMax="4" 
										id="review" 
										label="Review" 
										value={this.state.review}  
										onChange={this.handleInputChange} 
										fullWidth
									/>
								</Grid>
								<Grid item xs={2} sm={2} style={{marginTop: 18}}>
									<input 
										accept="image/*" 
										style={{display: 'none'}}
										id="image_file" 
										type="file"
										value={this.state.image}  
										onChange={this.handleInputChange} 
									/>
								    <label id="image" htmlFor="image_file" style={{marginLeft: 15}}>
								        <IconButton color="primary" component="span">
								          <PhotoCamera />
								        </IconButton>
								    </label>
								</Grid>
							</Grid>	
							<div style={{display: 'flex'}}>
								<Button 
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									style={{marginTop: 20}}
								>
									Save 
								</Button>
							</div>
						</form>
			        </Paper>
			    </main>
			</Fragment>
		)
	}
}


Images.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Images);
