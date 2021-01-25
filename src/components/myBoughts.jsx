import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import cardService from "../services/cardService";
import { Divider, Grid } from "@material-ui/core";
import SingleCard from "./common/singleCard";
import NoBoughts from "./common/noBoughts";
import Swal from "sweetalert2";

class MyBoughts extends Component {
  state = {
    cards: [],
  };

  async componentDidMount() {
    const { data } = await cardService.getMyCards();
    if (data.length > 0) this.setState({ cards: data });
  }

  deleteCard = async (cardId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "There is no coming back.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#999",
      confirmButtonText: "Yes, delete my Bought",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // update state
        let { cards } = this.state;
        cards = cards.filter((card) => card._id !== cardId);
        this.setState({ cards });

        // update the DB
        await cardService.deleteMyCard(cardId);

        Swal.fire("Deleted!", "Your card has been deleted.", "success");
      }
    });
  };

  render() {
    const { cards } = this.state;

    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <PageHeader titleText="My Boughts" />
        </Grid>
        <Grid
          container
          direction="row"
          spacing={2}
          justify="space-around"
          alignItems="flex-start"
        >
          {cards.length > 0 ? (
            cards.map((card) => (
              <SingleCard
                key={card._id}
                card={card}
                edit={true}
                deleteCard={this.deleteCard}
              />
            ))
          ) : (
            <div>
              <br />
              <Divider />
              <NoBoughts
                noBoughts={
                  "You didn't share any Boughts. Click 'Share Your Boughts' in the menu"
                }
              />
            </div>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default MyBoughts;
