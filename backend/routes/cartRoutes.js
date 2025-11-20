const express = require("express");
const cartRouter = express.Router();
// Importamos los controllers necesarios
const cartController = require("../controllers/cartController");


cartRouter.get("/:id", cartController.getCart);


module.exports = cartRouter;
