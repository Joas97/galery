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
import DoneIcon from '@material-ui/icons/Done'
import Dialog from '@material-ui/core/Dialog';
import {DialogContent, DialogContentText} from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import './index.css';

const styles = theme => ({
	root: {
	    width: '100%',
	    marginTop: theme.spacing.unit * 10,
	    overflowX: 'auto',
	    borderRadius: 10,
	},
  	layout: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		[theme.breakpoints.up(1000 + theme.spacing.unit * 2 * 2)]: {
		  width: 1000,
		  marginLeft: 'auto',
		  marginRight: 'auto',
		},
	},
	table: {
		minWidth: 'auto',
	},
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
		this.setState({ 
			open: false 
		});
	};

  	updateImage = async (id) => {
		const url = 'https://api.lmexpedition.com/images/'+1+'/'+id;

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
		const url = 'https://api.lmexpedition.com/images/all/2';

		const settings = {
			method : 'GET'
		};

		const myRequest = new Request(url, settings);

		await fetch (myRequest)
		.then(response  => response.json())
		.then(images => this.setState({ images }))
		.catch(error => console.log(error))
	} 

	deleteImage = async (id) => {
		const url = 'https://api.lmexpedition.com/images/'+id;


		const settings = {
			method : 'DELETE'
		};

		const myRequest = new Request(url, settings);

		await fetch (myRequest)
		.then(response  => response.json())
		.then(data => {
			this.state.images.filter((e,i) => {
		        return i !== id
		    })
		})
		.catch(error => console.log(error))
  	};

	render(){
		const { classes } = this.props;
   		const images = this.state.images;
   		return(

			<Fragment>
				<Navbar />
				<main className={classes.layout}>
			      	<Paper className={classes.root}>
					<Table className={classes.table} >
				        <TableHead>
				          <TableRow>
				           <TableCell>Name</TableCell>
				            <TableCell className="hidden-xs">Email</TableCell>
				            <TableCell className="hidden-xs">Facebook</TableCell>
				            <TableCell className="hidden-xs">Review</TableCell>
				            <TableCell align="center">Actions</TableCell>
				          </TableRow>
				        </TableHead>
					        {images.map(image =>
					        	<TableBody key={image.id}>
					        		<TableRow>
						              <TableCell>{image.name}</TableCell>
						              <TableCell className="hidden-xs">{image.email}</TableCell>
						              <TableCell className="hidden-xs">{image.facebook}</TableCell>
						              <TableCell className="hidden-xs">{image.review}</TableCell>
						              <TableCell>
						              	<IconButton color="primary" aria-label="view image" onClick={() => this.handleOpen(image.url)}>
								        	<SearchIcon />
								      	</IconButton>
								      	<IconButton color="primary" aria-label="done" onClick={() => this.updateImage(image.id)}>
								        	<DoneIcon />
								      	</IconButton>
								      	<IconButton color="primary" aria-label="delete" onClick={() => this.deleteImage(image.id)}>
								        	<DeleteIcon />
								      	</IconButton>
		      						  </TableCell>
						            </TableRow>
					       		</TableBody>
							)}
				      </Table>
			    	</Paper>
			    </main>
			    <Dialog
		          onClose={this.handleClose}
		          aria-labelledby="customized-dialog-title"
		          open={this.state.open}
		        >
		          <DialogContent>
		          	<DialogContentText id="alert-dialog-description" style={{width: 'auto', height: 'auto'}}>
			            <img src={this.state.url} alt ="" width="100%" />
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
