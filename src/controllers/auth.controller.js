const express = require("express");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const newOTP = require("otp-generators");

const crudController = require("./crud.controller");
const router = express.Router();

const controller = crudController(User);

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

module.exports = router;
