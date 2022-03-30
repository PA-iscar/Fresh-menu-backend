const express = require("express");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const newOTP = require("otp-generators");
const passport = require("../configs/google-oauth");

const router = express.Router();

//* Google OAuth

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get("/login/check", async (req, res) => {
  if (!req.user) {
    return res.status(400).json("Google Authentication Failed");
  }
  const { email } = req.user;
  const user = await User.findOne({ email });
  res.status(200).json(user);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "404",
  }),
  (req, res) => {
    // res.redirect("http://localhost:3000/");
  }
);

//* Create new User
router.post("/register", async (req, res) => {
  const user1 = await User.find({ mobileNumber: req.body.mobileNumber });
  const user2 = await User.find({ email: req.body.email });
  if (user1.length > 0) {
    res.status(400).json("");
  } else if (user2.length > 0) {
    res.status(400).json("");
  } else {
    const createdUser = await User.create(req.body);
    const createdCart = await Cart.create({
      userID: createdUser["_id"],
      meals: [],
    });
    const updatedUser = await User.findByIdAndUpdate(
      createdUser["_id"],
      { cart: createdCart["_id"] },
      {
        new: true,
      }
    );
    res.status(201).json("Registered successfully");
  }
});

//* Check if user Exists if yes send OTP and ID
router.get("/", async (req, res) => {
  const user = await User.find(req.query);
  if (user.length == 0) {
    res.status(400).json("");
  } else {
    const OTP = newOTP.generate(5, {
      alphabets: false,
      upperCase: false,
      specialChar: false,
    });
    const response = {
      id: user[0]["_id"],
      OTP,
    };
    const updatedUser = await User.findByIdAndUpdate(
      user[0]["_id"],
      { OTP },
      {
        new: true,
      }
    );
    res.status(200).json(response);
  }
});

//* Login user
router.get("/login/:id/:otp", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user.OTP === req.params.otp) {
    res.status(200).json(user);
  } else {
    res.status(400).json("");
  }
});

//* Logout user
router.get("/logout", function (req, res) {
  req.session.destroy(function () {});
  res.status(200).json("Logout Success");
});

module.exports = router;
