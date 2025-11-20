const cartModel = require("../models/cartModel");

const getCart = async (req, res)  =>{
    const id = parseInt(req.params.id)
    const cart = await cartModel.getCart(id);
    res.json(cart);
}
module.exports = {
  getCart
};