const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");

//  Schema for a card by Mongoose 📈
const cardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true, // set to FALSE
    minlength: 1,
    maxlength: 999999,
    unique: true,
  },
  cardTitle: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  cardBoughtFor: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5,
  },
  cardBoughtAt: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  cardDescription: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 2000,
  },
  cardImage: {
    type: String,
    required: false,
    minlength: 11,
    maxlength: 1024,
  },
  cardShipping: {
    type: String,
    required: true,
  },
  cardPublishedAt: {
    type: Date,
    timestamps: true,
    default: Date.now(), // 🦨 Change it to READABLE data!
  },

  cardFav: {
    type: Boolean,
    required: false,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Card = mongoose.model("Card", cardSchema);

// Schema for Joi 📉
function validateCard(card) {
  const schema = Joi.object({
    cardTitle: Joi.string().min(5).max(20).required(),
    cardFav: Joi.boolean(),
    cardBoughtFor: Joi.string().required().min(1).max(5),
    cardBoughtAt: Joi.string().required().min(2).max(20),
    cardDescription: Joi.string().required().min(20).max(2000),
    cardImage: Joi.string().min(11).max(1024),
    cardShipping: Joi.string().required(),
  });
  return schema.validate(card);
}

async function generateCardNumber(Card) {
  while (true) {
    let randomNumber = _.random(1, 999999);
    let card = await Card.findOne({ cardNumber: randomNumber });
    if (!card) return String(randomNumber);
  }
}

exports.Card = Card;
exports.validateCard = validateCard;
exports.generateCardNumber = generateCardNumber;
