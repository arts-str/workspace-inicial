const express = require("express");
const productRouter = express.Router();
// Importamos los controllers necesarios
const peopleController = require("../controllers/productController");


productRouter.get("/:id", peopleController.getProduct);
productRouter.get("/comments/:id", peopleController.getProductComments);


module.exports = productRouter;
