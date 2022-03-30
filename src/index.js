const express = require("express");
const cors = require("cors");
const connect = require("./configs/db");
const session = require("express-session");
const passport = require("./configs/google-oauth");
require("dotenv").config();

const mealController = require("./controllers/meal.controller");
const userController = require("./controllers/user.controller");
const cartController = require("./controllers/cart.controller");
const authController = require("./controllers/auth.controller");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
// app.use(
//   cookieSession({ name: "session", keys: ["abcd"], maxAge: 24 * 60 * 60 * 100 })
// );
app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true,
  })
);

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
