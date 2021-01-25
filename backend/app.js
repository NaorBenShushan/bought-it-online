const users = require("./routes/users");
const auth = require("./routes/auth");
const cards = require("./routes/cards");
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");

mongoose
  .connect(
    //THE MongoDB SERVER => /*  "mongodb+srv://naor:Zeld5apQRJCcHp70@finalprojecthackeru.ysydv.mongodb.net/nodejs-final?retryWrites=true&w=majority", */
    "mongodb://localhost/nodejs-final",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }
  )
  .then(() => console.log("Connected to MongoDB... 🍭"))
  .catch((err) => console.error("Couldn't connect to mongo 😭"));

app.use(cors());
app.use(express.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/boughts", cards);

const PORT = process.env.PORT || 4000;
http.listen(PORT, () => console.log(`http://localhost:${PORT}`));
