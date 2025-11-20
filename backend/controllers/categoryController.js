const categoryModel = require("../models/categoryModel");

const getCategory = async (req, res)  =>{
    const id = parseInt(req.params.id)
    const category = await categoryModel.getCategory(id);
    res.json(category);
}
const getCategories = async (req, res)  =>{
    const categories = await categoryModel.getCategories();
    res.json(categories);
}
module.exports = {
  getCategory,
  getCategories
};