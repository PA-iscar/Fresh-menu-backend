const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  cuisine: { type: String, required: true },
  trending: { type: String, required: true },
  tags: { type: Array, required: true },
  image: { type: String, required: true },
  customizable: { type: Boolean, required: true },
  details: { type: String, required: true },
  ingredients: { type: Array, required: true },
  type: { type: String, required: true },
});

const Meal = mongoose.model("meal", mealSchema);

module.exports = Meal;
