const express = require("express");
const _ = require("lodash");
const { Card, validateCard, generateCardNumber } = require("../models/card");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/my-boughts", auth, async (req, res) => {
  if (!req.user) return res.status(401).send("Access Denied.");

  const cards = await Card.find({ user_id: req.user._id });

  res.send(cards);
});

// Delete a card by ID
router.delete("/:id", auth, async (req, res) => {
  const card = await Card.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!card) return res.status(404).send("The ID didn't match any card.");
  res.send(card);
});

// Edit card by ID
router.put("/:id", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = await Card.findOneAndUpdate(
    { _id: req.params.id, user_id: req.user._id },
    req.body
  );
  if (!card) return res.status(404).send("The ID doesn't match any card.");

  card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(card);
});

// Get a single card by id
router.get("/:id", auth, async (req, res) => {
  const card = await Card.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });

  if (!card) return res.status(404).send("The ID doesn't match any card.");

  res.send(card);
});

// Get all cards
router.get("/", async (req, res) => {
  const cards = await Card.find({ name: req.name });

  Card.find({ name: req.name });

  res.send(cards);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = new Card({
    cardNumber: await generateCardNumber(Card),
    cardTitle: req.body.cardTitle,
    cardBoughtAt: req.body.cardBoughtAt,
    cardBoughtFor: req.body.cardBoughtFor,
    cardShipping: req.body.cardShipping,
    cardDescription: req.body.cardDescription,
    cardImage: req.body.cardImage
      ? req.body.cardImage
      : "https://cdn.pixabay.com/photo/2014/04/03/11/50/shopping-312311_960_720.png",
    user_id: req.user._id,
  });

  post = await card.save();
  res.send(post);
});

module.exports = router;
