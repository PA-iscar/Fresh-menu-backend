const express = require("express");
const cors = require("cors");
const connect = require("./configs/db");
require("dotenv").config();

const mealController = require("./controllers/meal.controller");
const userController = require("./controllers/user.controller");
const cartController = require("./controllers/cart.controller");
const authController = require("./controllers/auth.controller");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authController);
app.use("/meals", mealController);
app.use("/users", userController);
app.use("/cart", cartController);

app.listen(PORT, async () => {
  try {
    await connect();
    console.log("listening to port: ", PORT);
  } catch (err) {
    console.log(err.message);
  }
});
