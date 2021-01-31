import React, { Component } from 'react';
import SingleCard from './common/singleCard';
import Grid from '@material-ui/core/Grid';
import cardService from '../services/cardService';
import userService from '../services/userService';
import PageHeader from './common/pageHeader';
import SearchIcon from '@material-ui/icons/Search';
import { Divider, InputBase } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { useStyles } from './css/share';
import NoBoughts from './common/noBoughts';

class Home extends Component {
  state = {
    cardsToDisplay: [],
    cardsFetched: [],
    favorites: [],
  };

  async componentDidMount() {
    const { data } = await cardService.getAllCards();
    const favorites = userService.getFavoritesLS() || [];

    if (data.length > 0)
      this.setState({ cardsToDisplay: data, cardsFetched: data, favorites });
  }

  // Favorites
  handleToggleFavorite = async (cardId) => {
    try {
      // update server + LS
      await userService.toggleFavorites(cardId);

      // get updated list
      const favorites = userService.getFavoritesLS();

      // update state ==> added/removed ==> state changed ==> render()
      await this.setState({ favorites });
    } catch (ex) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You can't add to favorites. Please Login",
        showConfirmButton: true,
        confirmButtonText: 'Login',
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (ex.response) {
            window.location = '/login';
          }
        }
      });
    }
  };

  // Search
  handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    //const { cardsFetched } = this.state;
    let cardsFetched = JSON.parse(JSON.stringify(this.state.cardsFetched));

    if (!searchValue)
      return this.setState({ ...this.state, cardsToDisplay: cardsFetched });

    let newCards = cardsFetched.filter(
      (card) =>
        card.cardTitle.toLowerCase().includes(searchValue) ||
        card.cardDescription.toLowerCase().includes(searchValue)
    );

    return this.setState({ ...this.state, cardsToDisplay: newCards });
  };

  render() {
    const { classes } = this.props;
    const { cardsToDisplay, favorites } = this.state;
    return (
      <div>
        {/* Welcome title */}

        <PageHeader titleText={'Welcome to Bought It!'} />

        {/* Search */}
        <Grid item>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search a Bought…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
        </Grid>
        {/* end Search */}

        <Divider style={{ margin: '1.2rem 0' }} />

        <Grid
          container
          direction="row"
          spacing={2}
          justify="center"
          alignItems="flex-start"
        >
          {cardsToDisplay.length > 0 ? (
            cardsToDisplay.map((card) => (
              <SingleCard
                key={card._id}
                card={card}
                favorite={true}
                isFavorite={favorites.includes(card._id)}
                click={() => this.handleToggleFavorite(card._id)}
              />
            ))
          ) : (
            <div>
              <br />
              <Divider />
              <NoBoughts noBoughts={'There are no Boughts to show'} />
            </div>
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(Home);
