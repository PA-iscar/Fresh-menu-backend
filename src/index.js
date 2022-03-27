const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const mealController = require("./controllers/meal.controller");
const userController = require("./controllers/user.controller");
const cartController = require("./controllers/cart.controller");

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/meals", mealController);
app.use("/users", userController);
app.use("/cart", cartController);

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
