import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

class Album extends Component {

  constructor(){
    super();
      this.state = {
      images: []
    }
  }

  componentDidMount = async () => {
    const url = 'http://localhost:3000/Images';

    const settings = {
      method : 'GET'
    };

    const myRequest = new Request(url, settings);

    await fetch (myRequest)
    .then(response => response.json())
    .then(data => this.setState({ images: data }))
    .catch(error => console.log(error))

  }

	render() {
		  const { classes } = this.props;
      const  images  = this.state.images;

		  return (
		    <React.Fragment>
		      <CssBaseline />
		      <AppBar position="static" className={classes.appBar}>
		        <Toolbar>
		          <CameraIcon className={classes.icon} />
		          <Typography variant="h6" color="inherit" noWrap>
		            Album layout
		          </Typography>
		        </Toolbar>
		      </AppBar>
		      <main>
		       <div className={classNames(classes.layout, classes.cardGrid)}>
		           <Grid container spacing={40}>
		            {images.map(image => (
		              <Grid item key={image.id} sm={6} md={4} lg={3}>
		                <Card className={classes.card}>
		                  <CardMedia
		                    className={classes.cardMedia}
		                    image={image.url}
		                    title={image.name}
		                  />
		                  <CardContent className={classes.cardContent}>
		                    <Typography gutterBottom variant="h5" component="h2">
                          {image.name}
		                    </Typography>
		                    <Typography>
                          {image.review}
		                    </Typography>
		                  </CardContent>
		                  <CardActions>
                        <Typography gutterBottom variant="h5" component="h5">
                          {image.email}
		                    </Typography>
                        <Typography gutterBottom variant="h5" component="h5">
                          {image.facebook}
		                    </Typography>
		                  </CardActions>
		                </Card>
		              </Grid>
		            ))}
		          </Grid>
		        </div>
		      </main>

		    </React.Fragment>
		  );
		}
	}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);
