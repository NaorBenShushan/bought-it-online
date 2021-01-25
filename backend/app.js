const users = require("./routes/users");
const auth = require("./routes/auth");
const cards = require("./routes/cards");
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

mongoose
  .connect(
    "mongodb+srv://naor:WWOtLyQHyRlSrjDn@bought-it-online.ysydv.mongodb.net/bought-it-online?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }
  )
  .then(() => console.log("Connected to MongoDB... 🍭"))
  .catch((err) => console.error(err, "Couldn't connect to mongo 😭"));

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../build")));

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/boughts", cards);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"), (err) => {
    if (err) res.status(500).send("An unexpected error has occurred!");
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
