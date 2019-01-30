import React, { Component, Fragment } from 'react';
import Navbar from '../Navbar';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import {DialogContent, DialogContentText} from '@material-ui/core/';
const styles = theme => ({
  	layout: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		[theme.breakpoints.up(800 + theme.spacing.unit * 2 * 2)]: {
		  width: 800,
		  marginLeft: 'auto',
		  marginRight: 'auto',
		},
	},
	table: {
		marginTop: theme.spacing.unit * 7,
		minWidth: 700,
	},
	row: {
		'&:nth-of-type(odd)': {
		  backgroundColor: theme.palette.background.default,
		},
	},
	fab: {
   	 	margin: theme.unit,
   	 	width: 35,
   		height: 35,
  	},
  	extendedIcon: {
  		  marginRight: theme.unit,
  	}
});

class Images extends Component{
	constructor(){
	    super();
	    this.state = {
	      images: [],
	      open: false,
	      url: ""
	    }
	  }
handleOpen = (url, id) => {
    this.setState({
      open: true,
      url: url
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  updateImage = async (id) => {
	  const url = 'http://localhost:3000/images/'+5+'/'+id;

	  const data = {
	  	"status": 1
	  };

	  const settings = {
	    method : 'PUT',
	    headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(data)
	  };

	  const myRequest = new Request(url, settings);

	   await fetch (myRequest)
	  .then(response  => response.json())
	  .then(data => console.log("SUCCESS"))
	  .catch(error => console.log(error))
  };

	  componentDidMount = async () => {
	  const url = 'http://localhost:3000/images/all/2';

	  const settings = {
	    method : 'GET'
	  };

	  const myRequest = new Request(url, settings);

	   await fetch (myRequest)
	  .then(response  => response.json())
	  .then(data => this.setState({ images: data }))
	  .catch(error => console.log(error))
	} 

	deleteImage = async (id) => {
	  const url = 'http://localhost:3000/images/'+id;


	  const settings = {
	    method : 'DELETE',
	    headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	    },
	   
	  };

	  const myRequest = new Request(url, settings);

	   await fetch (myRequest)
	  .then(response  => response.json())
	  .then(data => console.log("SUCCESS"))
	  .catch(error => console.log(error))
  };

	  componentDidMount = async () => {
	  const url = 'http://localhost:3000/images/all/2';

	  const settings = {
	    method : 'GET'
	  };

	  const myRequest = new Request(url, settings);

	   await fetch (myRequest)
	  .then(response  => response.json())
	  .then(data => this.setState({ images: data }))
	  .catch(error => console.log(error))
	}

	render(){
		const { classes } = this.props;
   		const images = this.state.images;
   		return(

			<Fragment>
				<Navbar />
				<main className={classes.layout}>
			      
					<Table className={classes.table} >
				        <TableHead>
				          <TableRow>
				           <TableCell  align="center">Name</TableCell>
				            <TableCell align="center">Email</TableCell>
				            <TableCell align="center">Facebook</TableCell>
				            <TableCell align="center">Review</TableCell>
				            <TableCell align="center">Image</TableCell>
				            <TableCell align="center">Action</TableCell>
				          </TableRow>
				        </TableHead>
					        {images.map(image =>
					        	<TableBody key={image.id}>
					        		<TableRow>
						              <TableCell align="right">{image.name}</TableCell>
						              <TableCell align="right">{image.email}</TableCell>
						              <TableCell align="right">{image.facebook}</TableCell>
						              <TableCell component="th">{image.review}</TableCell>
						              <TableCell align="right">
						              	<Fab variant="extended" onClick={() => this.handleOpen(image.url)} aria-label="Search" className={classes.fab}>
						        			<SearchIcon/>
						      			</Fab>
		      						  </TableCell>
						              <TableCell align="right">
						              	<Fab variant="extended" onClick={() => this.deleteImage(image.id)} type="submit" aria-label="Delete" className={classes.fab}>
						        			<DeleteIcon />
						      			</Fab>
						      			<span style={{marginLeft:10}}></span>
						      			<Fab variant="extended" onClick={() => this.updateImage(image.id)} type="submit" aria-label="Done" className={classes.fab}>
						        			<DoneIcon/>
						      			</Fab>
						              </TableCell>
						            </TableRow>
					       		</TableBody>
							)}
				      </Table>
			    </main>
			    <Dialog
		          onClose={this.handleClose}
		          aria-labelledby="customized-dialog-title"
		          open={this.state.open}
		        >
		          <DialogContent>
		          	<DialogContentText id="alert-dialog-description">
			            <img src={this.state.url} alt ="" width="250px" height="250px" />
			        </DialogContentText>
		          </DialogContent>
		        </Dialog>
			</Fragment>
		)
	}
}


Images.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Images);
