import React, { useState } from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import makeStyles from "../css/singleCard";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles;

export default function SingleCard({
  card,
  isFavorite,
  click,
  favorite,
  edit,
  deleteCard,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item>
      <Card className={classes.card}>
        {/* Card Avatar and Title */}
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              N
            </Avatar>
          }
          title={card.cardTitle}
          subheader={card.cardPublishedAt}
        />
        {/* Card Image */}
        <div className={classes.media}>
          <CardMedia
            image={card.cardImage}
            title="First Bought"
            component="img"
            className={classes.image}
          />
        </div>

        {/* Card Action Buttons */}
        <CardActions disableSpacing>
          {/* Favorites button */}
          {favorite && (
            <div>
              <Grid container>
                <Grid item>
                  <IconButton aria-label="add to favorites">
                    <Tooltip
                      title={
                        isFavorite
                          ? "Remove from your favorites"
                          : "Add to your favorites"
                      }
                    >
                      <span>
                        <i
                          className={
                            isFavorite ? "fas fa-heart" : "far fa-heart"
                          }
                          id="favorite"
                          onClick={click}
                          style={{ color: "#4773FB" }}
                        ></i>
                      </span>
                    </Tooltip>
                  </IconButton>
                </Grid>

                {/* Share button */}
                <Grid item>
                    <IconButton
                      aria-label="share"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <Tooltip title="Share this Bought">
                        <ShareIcon />
                      </Tooltip>
                    </IconButton>
                     <Menu
                        id="fade-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                      >
                        <MenuItem onClick={handleClose}>
                          <FacebookIcon color="primary" />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <GitHubIcon color="disabled" />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <InstagramIcon color="secondary" />
                        </MenuItem>
                      </Menu>
                </Grid>
              </Grid>
            </div>
          )}

          {/* Edit Button */}
          {edit && (
            <div>
              <IconButton aria-label="Edit your Bought">
                <Tooltip title={"Edit your Bought"}>
                  <span>
                    <Link
                      style={{ color: "#4C5D73" }}
                      to={`/edit-card/${card._id}`}
                    >
                      <i className={"fas fa-edit"}></i>
                    </Link>
                  </span>
                </Tooltip>
              </IconButton>

              {/* Delete a card */}
              <IconButton aria-label="Delete your Bought">
                <Tooltip title={"Delete your Bought"}>
                  <span onClick={() => deleteCard(card._id)}>
                    <i className="fas fa-trash-alt"></i>
                  </span>
                </Tooltip>
              </IconButton>
            </div>
          )}

          {/* Expand Button */}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Tooltip title="Expand Bought">
              <ExpandMoreIcon />
            </Tooltip>
          </IconButton>
        </CardActions>

        {/* Card Collapse Data */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph className={classes.cardContent}>
              <span className={classes.cardContentSpan}>Bought at: </span>
              {card.cardBoughtAt}
              <br />
              <span className={classes.cardContentSpan}>Bought for: </span>
              {card.cardBoughtAt}$
              <br />
              <span className={classes.cardContentSpan}>Shipping: </span>
              {card.cardShipping}
              <br />
            </Typography>
            <Typography paragraph className={classes.description}>
              <span className={classes.cardContentSpan}>Description: </span>
              {card.cardDescription}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
