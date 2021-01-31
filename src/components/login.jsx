import React from 'react';
import PageHeader from './common/pageHeader';
import Joi from 'joi-browser';
import Form from './common/form';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useStyles } from './css/login';
import userService from '../services/userService';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

class Login extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {},
  };

  schema = {
    email: Joi.string().required().min(12).email().label('email'),
    password: Joi.string().required().min(3).label('password'),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      await userService.login(email, password);
      window.location = '/';
    } catch (ex) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        showConfirmButton: false,
        text: 'Invalid Username or Password',
        showDenyButton: true,
        denyButtonText: 'Try again',
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (ex.response && ex.response.status(400)) {
            this.setState({ errors: { email: ex.response.data } });
          }
        }
      });
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/" />;
    const { classes } = this.props;
    return (
      <div>
        <PageHeader titleText="Login" />
        <Paper elevation={4} className={classes.paperClass}>
          <Grid container alignItems="flex-end" justify="center">
            <Grid item>
              <div>
                <form
                  onSubmit={this.handleSubmit}
                  method="POST"
                  autoComplete="off"
                  className={classes.form}
                >
                  <Typography variant="h6" className={classes.root}>
                    Enter your details:
                  </Typography>
                  {this.renderInput('email', 'Email', 'email')}
                  {this.renderInput('password', 'Password', 'password')}
                  {this.renderButton('Login')}
                </form>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(useStyles)(Login);
