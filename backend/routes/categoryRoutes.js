const express = require("express");
const categoryRouter = express.Router();
// Importamos los controllers necesarios
const categoryController = require("../controllers/categoryController");


categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/:id", categoryController.getCategory);


module.exports = categoryRouter;