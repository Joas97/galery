import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import logo from './login.png';
import { Redirect } from 'react-router';
import './login.css';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    borderRadius: 10,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  }
});

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'https://api.lmexpedition.com/auth/login';
    
    const settings = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    
    const myRequest = new Request(url, settings);

    await fetch(myRequest)
    .then(response => response.json())
    .then(data => {
      if(data.message !== "Incorrect username or password"){
        localStorage.setItem('session', true);
      }
    })
    .catch(error => console.log(error))
  }


  render() {
    const { classes } = this.props;
    let { from } = this.props.location.state || { from: { pathname: "/Images" } };
    
    if(localStorage.getItem('session') === "true"){
      return <Redirect to={from} />;
    }

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <div className="login_image">
            <img className="logo_img" src={logo} alt="image_login"/>
          </div>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
             <TextField
              id="username"
              label="Username"
              autoComplete="off"
              margin="normal"
              value={this.state.username}
              onChange={this.handleChange}
              required
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
               value={this.state.password}
              onChange={this.handleChange}
              required
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);