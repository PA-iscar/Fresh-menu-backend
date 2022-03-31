const express = require("express");
const Meal = require("../models/meal.model");

const crudController = require("./crud.controller");
const router = express.Router();

const controller = crudController(Meal);

//* Read Many
router.get("/all", controller.getAll);

//* Get all Filters
router.get("/filters", async (req, res) => {
  const data = await Meal.find().select("type cuisine trending category -_id");
  const filters = {};
  const types = {};
  const cuisines = {};
  const trendings = {};
  const categories = {};
  for (let el of data) {
    types[el.type] ? types[el.type]++ : (types[el.type] = 1);
    cuisines[el.cuisine] ? cuisines[el.cuisine]++ : (cuisines[el.cuisine] = 1);
    trendings[el.trending]
      ? trendings[el.trending]++
      : (trendings[el.trending] = 1);
    categories[el.category]
      ? categories[el.category]++
      : (categories[el.category] = 1);
  }

  let i = 0;
  let filters2 = [];
  for (let key in types) {
    filters2[i++] = { [key]: types[key] };
  }
  filters["types"] = filters2;

  i = 0;
  filters2 = [];
  for (let key in cuisines) {
    filters2[i++] = { [key]: cuisines[key] };
  }
  filters["cuisines"] = filters2;

  i = 0;
  filters2 = [];
  for (let key in trendings) {
    filters2[i++] = { [key]: trendings[key] };
  }
  filters["trendings"] = filters2;

  i = 0;
  filters2 = [];
  for (let key in categories) {
    filters2[i++] = { [key]: categories[key] };
  }
  filters["categories"] = filters2;

  res.status(200).json(filters);
});

//* Read One
router.get("/:id", controller.getOne);

module.exports = router;
