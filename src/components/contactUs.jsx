import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./css/share";
import Button from "@material-ui/core/Button";
import { Divider, Paper, Typography } from "@material-ui/core";
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Grid from "@material-ui/core/Grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ContactMailIcon from "@material-ui/icons/ContactMail";

class ContactUs extends Form {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <PageHeader titleText={"Contact Us!"} />
        <form onSubmit={this.handleSubmit} method="POST" autoComplete="off">
          <Paper elevation={12} className={classes.paper}>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="flex-start"
              spacing={2}
              className={classes.gridContainer}
            >
              {/* User's details */}
              <Grid item className={classes.gridItem}>
                <Typography variant="h6" className={classes.smHeadline}>
                  Your details:
                </Typography>
                {this.renderInput("cardTitle", "Full Name")}
                {this.renderInput("cardBoughtAt", "Email")}
                {this.renderInput("cardBoughtFor", "Phone number")}
              </Grid>

              {/* User's Message */}
              <Grid item className={classes.gridItem}>
                <Typography variant="h6" className={classes.smHeadline}>
                  Your message:
                </Typography>
                {this.renderInput("cardDescription", "Type it here..", "")}
              </Grid>

              {/* Upload and Share */}
              <Grid item className={classes.gridItem}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    className={classes.button}
                  >
                    Upload an Image
                  </Button>
                </label>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                />
                <Divider variant="middle" />
                <div className={classes.button}>
                  <Button
                    startIcon={<ContactMailIcon />}
                    className={classes.button}
                  >
                    Contact Us
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </div>
    );
  }
}

export default withStyles(useStyles)(ContactUs);
