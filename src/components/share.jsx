import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./css/share";
import Button from "@material-ui/core/Button";
import { Divider, Paper, Typography } from "@material-ui/core";
import Form from "./common/form";
import Joi from "joi-browser";
import Grid from "@material-ui/core/Grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Redirect } from "react-router-dom";
import userService from "../services/userService";
import cardService from "../services/cardService";
import { toast } from "react-toastify";
import PageHeader from "./common/pageHeader";

class Share extends Form {
  state = {
    data: {
      cardTitle: "",
      cardBoughtAt: "",
      cardBoughtFor: "",
      cardShipping: "",
      cardDescription: "",
      cardImage: "",
    },
    errors: {},
  };

  schema = {
    cardTitle: Joi.string().min(5).max(20).required(),
    cardBoughtAt: Joi.string().required().min(2).max(20),
    cardBoughtFor: Joi.string().required().min(1).max(5),
    cardShipping: Joi.string().min(1).max(6).required(),
    cardDescription: Joi.string().required().min(20).max(2000),
    cardImage: Joi.string().min(11).max(1024).uri().allow(""),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      if (!data.cardImage) delete data.cardImage;

      await cardService.createBought(data);

      toast.success("Your card was created successfully!", {
        position: "top-center",
        autoClose: 2000,
      });

      this.props.history.replace("/my-boughts");
    } catch {}
  };

  render() {
    if (!userService.getCurrentUser()) return <Redirect to="/login" />;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <PageHeader titleText={"Share your Bought!"} />
        <form onSubmit={this.handleSubmit} method="POST" autoComplete="off">
          <Paper
            elevation={12}
            className={classes.paper}
            /* className={classes.gridContainer} */
          >
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="flex-start"
              spacing={2}
            >
              {/* Tell us more details */}
              <Grid item className={classes.gridItem}>
                <Typography variant="h6" className={classes.smHeadline}>
                  Tell us some details...
                </Typography>
                <div className={classes.inputError}>
                  {this.renderInput("cardTitle", "Title")}
                </div>
                {this.renderInput("cardBoughtAt", "Where did you buy it?")}
                {this.renderInput("cardBoughtFor", "How much did it cost you?")}
                {this.renderInput("cardShipping", "Shipping fee")}
              </Grid>

              {/* Be more specific */}
              <Grid item className={classes.gridItem}>
                <Typography variant="h6" className={classes.smHeadline}>
                  Be more specific...
                </Typography>
                {this.renderInput(
                  "cardDescription",
                  "Describe your Bought",
                  ""
                )}
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
                    Upload Your Image
                  </Button>
                </label>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                />
                <Divider variant="middle" />
                {this.renderInput("cardImage", "Or use an image address..")}
                <Divider variant="middle" />

                <div className={classes.button}>
                  {this.renderButton("Share!")}
                </div>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </div>
    );
  }
}

export default withStyles(useStyles)(Share);
