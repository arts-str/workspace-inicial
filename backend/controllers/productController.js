const productModel = require("../models/productModel");

const getProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    const product = await productModel.getProduct(id);
    res.json(product);
}

const getProductComments = async (req, res) => {
    const id = parseInt(req.params.id)
    const productComments = await productModel.getProductComments(id);
    res.json(productComments);
}

module.exports = {
  getProduct,
  getProductComments
};