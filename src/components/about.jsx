import { Avatar, Grid, Typography } from "@material-ui/core";
import React from "react";
import PageHeader from "./common/pageHeader";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import OwnerProfile from "../static/images/owner_profile.png";
import { useStyles } from "./css/about";

export default function About() {
  const classes = useStyles();
  const theme = createMuiTheme();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={9} md={6}>
        <ThemeProvider theme={theme}>
          <PageHeader titleText="So who we are?" />
          <Typography variant="body1">
            We are a growing community which established back in 2017, in order
            to create a better and smarter purchasing experience worldwide.
          </Typography>
          <Typography variant="body1">
            Together, we've united to build a great place that shares users'
            bought products and recommend them or not. It seems that so far, we
            are in the correct way to achieve our goal.
          </Typography>
          <div className={classes.aboutFooter}>
            <div className={classes.avatar}>
              <Avatar
                alt="Naor Ben Shushan"
                src={OwnerProfile}
                className={classes.large}
              />
            </div>
            <div className={classes.founder}>
              <Typography variant="body2">
                <br /> The Founder:
              </Typography>
              <Typography variant="h6">Naor Ben Shushan</Typography>
              <Typography variant="body2">M.A. & a FullStack Dev.</Typography>
            </div>
          </div>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
