const express = require("express");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");

const crudController = require("./crud.controller");
const router = express.Router();

const controller = crudController(User);

//* Create new User
router.post("/register", async (req, res) => {
  try {
    const createdUser = await User.create(req.body);
    console.log(createdUser);
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
    res.status(201).send("Registered successfully");
  } catch (err) {
    res.status(400).send("Bad request", err);
  }
});

// //* Read Many
// router.get("/", controller.getAll);

// //* Read One
// router.get("/:id", controller.getOne);

// //* Update
// router.patch("/:id", controller.updateOne);

// //* Delete
// router.delete("/:id", controller.deleteOne);

module.exports = router;
