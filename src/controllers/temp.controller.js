const express = require("express");
const Book = require("../models/temp.model");

const crudController = require("./crud.controller");
const router = express.Router();

const controller = crudController(Book);

//* Create
router.post("/", controller.post);

//* Read Many
router.get("/", controller.getAll);

//* Read One
router.get("/:id", controller.getOne);

//* Read Books by Author ID
router.get("/:id/books", async (req, res) => {
  const books = await Author.find({books: [req.params.id]});
  res.status(200).json(books);
});

//* Update
router.patch("/:id", controller.updateOne);

//* Delete
router.delete("/:id", controller.deleteOne);

module.exports = router;
