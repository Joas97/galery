import React, { Component, Fragment } from 'react';
import Navbar from '../Navbar';
import { Grid, TextField, Button, Typography }from '@material-ui/core';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
			"image": null,
			"open": false

		};
		this.baseState = this.state;
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = event => {
		event.preventDefault();
		const formData = new FormData();

		formData.append('name', this.state.name);
		formData.append('review', this.state.review);
		formData.append('image', this.state.image[0]);

		const url = "http://localhost:3000/images";

		const settings = {
			method: 'POST',
			body: formData
		};

		const myRequest = new Request(url, settings);

		fetch(myRequest)
		.then(response => response.json())
		.then(data => this.setState({ open: true }))
		.catch(error => console.log(error));

		this.setState(this.baseState);
	}


	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
	      [name]: value
	    });

	}

	handleFileUpload = event => {
		this.setState({image: event.target.files});
	}

	handleClose = () => {
    	this.setState({ open: false });
  	};


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
										name="name" 
										label="Name" 
										value={this.state.name}  
										onChange={this.handleInputChange} 
										fullWidth
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField 
										name="email" 
										label="Email" 
										value={this.state.email}  
										onChange={this.handleInputChange} 
										fullWidth
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField 
										name="facebook" 
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
										name="review" 
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
										onChange={this.handleFileUpload} 
									/>
								    <label htmlFor="image_file" style={{marginLeft: 15}}>
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
			    <Dialog
		          open={this.state.open}
		          onClose={this.handleClose}
		          aria-labelledby="draggable-dialog-title"
		        >
		          <DialogTitle id="draggable-dialog-title">Success</DialogTitle>
		          <DialogContent>
		            <DialogContentText>
		              Datos registrados correctamente
		            </DialogContentText>
		          </DialogContent>
		          <DialogActions>
		            <Button onClick={this.handleClose} color="primary">
		              OK
		            </Button>
		          </DialogActions>
		        </Dialog>
			</Fragment>
		)
	}
}


Images.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Images);
