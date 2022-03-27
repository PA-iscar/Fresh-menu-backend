const express = require("express");
const Meal = require("../models/meal.model");

const crudController = require("./crud.controller");
const router = express.Router();

const controller = crudController(Meal);

//* Read Many
router.get("/", controller.getAll);

//* Read One
router.get("/:id", controller.getOne);

module.exports = router;
