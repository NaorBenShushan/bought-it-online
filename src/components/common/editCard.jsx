import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "../css/share";
import Button from "@material-ui/core/Button";
import { Divider, Paper } from "@material-ui/core";
import Form from "../common/form";
import Joi from "joi-browser";
import Grid from "@material-ui/core/Grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Redirect } from "react-router-dom";
import userService from "../../services/userService";
import cardService from "../../services/cardService";
import { toast } from "react-toastify";
import PageHeader from "../common/pageHeader";

class EditCard extends Form {
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
    _id: Joi.string(),
    cardTitle: Joi.string().min(5).max(20).required(),
    cardBoughtAt: Joi.string().required().min(2).max(20),
    cardBoughtFor: Joi.string().required().min(1).max(5),
    cardShipping: Joi.string().min(1).max(6).required(),
    cardDescription: Joi.string().required().min(20).max(2000),
    cardImage: Joi.string().min(11).max(1024).uri().allow(""),
  };

  async componentDidMount() {
    const cardId = this.props.match.params.id;
    const { data } = await cardService.getCardById(cardId);
    this.setState({ data: this.mapToViewModel(data) });
  }

  mapToViewModel(card) {
    return {
      _id: card._id,
      cardTitle: card.cardTitle,
      cardBoughtAt: card.cardBoughtAt,
      cardBoughtFor: card.cardBoughtFor,
      cardShipping: card.cardShipping,
      cardDescription: card.cardDescription,
      cardImage: card.cardImage,
    };
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;

      console.log(data);
      await cardService.editCardById(data);

      toast.success("Your card edited successfully!", {
        position: "top-center",
        autoClose: 2000,
      });

      this.props.history.replace("/my-boughts");
    } catch (err) {}
  };

  render() {
    if (!userService.getCurrentUser()) return <Redirect to="/login" />;
    const { classes } = this.props;
    return (
      <Paper className={classes.modalPaper}>
        <Grid container direction="column" spacing={2}>
          <Grid item className={classes.modalHeader}>
            <PageHeader titleText={"Edit your Bought:"} />
          </Grid>
          <Grid item>
            <form onSubmit={this.handleSubmit} method="POST" autoComplete="off">
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={6}
                className={classes.modalContainer}
              >
                {/* Tell us more details */}
                <Grid item className={classes.modalInputs}>
                  {this.renderInput("cardTitle", "Title")}
                  {this.renderInput("cardBoughtAt", "Where did you buy it?")}
                  {this.renderInput(
                    "cardBoughtFor",
                    "How much did it cost you?"
                  )}
                  {this.renderInput("cardShipping", "Shipping fee")}
                </Grid>

                {/* Be more specific */}
                <Grid item className={classes.modalDescInputs}>
                  {this.renderInput(
                    "cardDescription",
                    "Describe your Bought",
                    ""
                  )}
                </Grid>

                {/* Upload and Share */}
                <Grid item>
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
                  {this.renderInput("cardImage", "Or use image address..")}

                  <Divider variant="middle" />

                  <div onClick={this.handleSubmit} className={classes.button}>
                    {this.renderButton("Edit")}
                  </div>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(EditCard);
