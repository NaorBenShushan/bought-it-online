import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import userService from "../services/userService";
import { Divider, Grid } from "@material-ui/core";
import SingleCard from "./common/singleCard";
import NoBoughts from "./common/noBoughts";

class Favorites extends Component {
  state = {
    cards: [],
    favorites: [],
  };

  async componentDidMount() {
    const { data } = await userService.getFavoritesSE();
    const favorites = userService.getFavoritesLS() || [];

    if (data.length > 0) this.setState({ cards: data, favorites });
  }

  handleRemoveFavorite = async (cardId) => {
    try {
      // UPDATE SERVER + LS
      await userService.toggleFavorites(cardId);

      const favorites = userService.getFavoritesLS();

      // update state
      let { cards } = this.state;
      cards = cards.filter((card) => card._id !== cardId);
      this.setState({ favorites, cards });
    } catch (err) {}
  };

  render() {
    const { cards, favorites } = this.state;
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <PageHeader titleText={"My Favorites"} />
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
                favorite={true}
                isFavorite={favorites.includes(card._id)}
                click={() => this.handleRemoveFavorite(card._id)}
              />
            ))
          ) : (
            <div>
              <br />
              <Divider />
              <NoBoughts noBoughts={"There are no favorite Boughts to show"} />
            </div>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default Favorites;
