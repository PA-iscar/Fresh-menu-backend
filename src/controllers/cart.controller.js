const express = require("express");
const Cart = require("../models/cart.model");

const crudController = require("./crud.controller");
const router = express.Router();

const controller = crudController(Cart);

// //* Create
// router.post("/", controller.post);

// //* Read Many
// router.get("/", controller.getAll);

//* Read One
router.get("/:id", async (req, res) => {
  const item = await Cart.findOne({ userID: req.params.id });
  res.status(200).json(item.meals);
});

// //* Update
// router.patch("/:id", controller.updateOne);

// //* Delete
// router.delete("/:id", controller.deleteOne);

module.exports = router;
