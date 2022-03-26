const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const tempController = require("./controllers/temp.controller");

const DB_URL = require("../databaseKey");
const PORT = 8000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/temp", tempController);

const connect = () => {
  return mongoose.connect(DB_URL);
};

app.listen(PORT, async () => {
  try {
    await connect();
    console.log("listening to port: ", PORT);
  } catch (err) {
    console.log(err.message);
  }
});
