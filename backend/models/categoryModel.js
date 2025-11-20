
const categoryPath= "../data/catsProducts/";
const categoriesPath= "../data/cats/";

const getCategory = async (id)  =>{
    try{
        const selectedCategory = require(categoryPath + id + ".json");
        return selectedCategory;
    }
    catch(err){
        console.log(err);

    }
    return false;

}

const getCategories = async() =>{
    try{
        const selectedCategories = require(categoriesPath + "cat.json");
        return selectedCategories;
    }
    catch(err){
        console.log(err);

    }
    return false;
}

module.exports = {
  getCategory,
  getCategories
};