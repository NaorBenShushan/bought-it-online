import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./css/register";

class Register extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().min(2).label("name"),
    password: Joi.string().required().min(3).label("password"),
    email: Joi.string().required().min(9).email().label("email"),
  };

  doSubmit = async () => {
    const { data } = this.state;

    try {
      await http.post(`${apiUrl}/api/users`, data);
      toast("Congratulations! Welcome to BoughtIt community!");
      this.props.history.replace("/login");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: "Email is taken. Try another one" } });
      }
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <PageHeader titleText="Register" />
        <Paper elevation={4} className={classes.paperClass}>
          <Grid container alignItems="flex-end" justify="center">
            <Grid item>
              <form
                onSubmit={this.handleSubmit}
                method="POST"
                autoComplete="off"
                className={classes.form}
              >
                <Typography variant="h6" className={classes.root}>
                  Create an Account and share your Boughts with us!
                </Typography>

                {this.renderInput("name", "Choose a Username")}
                {this.renderInput("email", "Enter Your Email", "email")}
                {this.renderInput("password", "Choose a Password", "password")}
                {this.renderButton("Register")}
              </form>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(useStyles)(Register);
