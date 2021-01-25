const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateCards } = require("../models/user");
const { Card } = require("../models/card");
const auth = require("../middleware/auth");
const router = express.Router();

const getCards = async (cardsArray) => {
  const cards = await Card.find({ cardNumber: { $in: cardsArray } });
  return cards;
};

// Get a card out of all of them
router.get("/boughts", auth, async (req, res) => {
  if (!req.query.numbers) res.status(400).send("Missing numbers!");

  let data = {};
  data.cards = req.query.numbers.split(",");

  const cards = await getCards(data.cards);
  res.send(cards);
});

// Access point to Update the Array of FAVORITES
router.patch("/boughts", auth, async (req, res) => {
  //change the path to FAVORITES
  const { error } = validateCards(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const cards = await getCards(req.body.cards);
  if (cards.length != req.body.cards.length)
    res.status(400).send("Card numbers don't match");

  let user = await User.findById(req.user._id);
  user.cards = req.body.cards;
  user = await user.save();
  res.send(user);
});

router.get("/my-details", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("The user is already registered.");

  // Encrypt the PASSWORD
  user = new User(_.pick(req.body, ["name", "password", "email", "cards"])); //pick - show specific vals
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

// Favorites
router.patch("/t-favorites/:cardId", auth, async (req, res) => {
  try {
    // get cardId
    const cardId = req.params.cardId;

    // who is the user
    const userId = req.user._id;
    const user = await User.findById(userId);

    // get favorites list
    const favs = user.favorites;

    // if the cardID exists in the list ==> remomve
    if (favs.includes(cardId)) {
      await User.updateOne({ _id: userId }, { $pull: { favorites: cardId } });
    }
    // else ==> add it to the list
    else {
      await User.updateOne(
        { _id: userId },
        { $addToSet: { favorites: cardId } }
      );
    }

    // send updated list as a response
    res.send("toggle happened successfully");
  } catch (err) {
    res.status(404).send(err, "There is no favorite card here");
  }
});

router.get("/get-favorites", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");

    res.send(user.favorites);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
