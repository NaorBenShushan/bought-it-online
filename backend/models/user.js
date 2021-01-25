const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//  Schema for user by Mongoose 📈
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 55,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now() },
  //cards: { type: Array },

  // Reference to the user's favorite
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name },
    /* config.get("jwtKey") */
    "Zeld5apQRJCcHp70"
  );
  return token;
};

userSchema.methods.getFavorites = function () {
  return JSON.stringify(this.favorites);
};

const User = mongoose.model("User", userSchema);

// Schema for Joi 📉
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(9).max(55).required().email(),
  });
  return schema.validate(user);
}

// User's Favorite Cards
function validateCards(data) {
  const schema = Joi.object({
    cards: Joi.array().min(1).required(), // 🛑 maybe min(0) ?!
  });

  return schema.validate(data);
}

exports.User = User;
exports.validate = validateUser;
