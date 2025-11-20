//const mariadb = require("mariadb");


const productPath = "../data/products/";
const commentPath = "../data/productsComments/";

const getProduct = async (id) =>{
    try{
        const selectedProduct = require(productPath + id + ".json");
        return selectedProduct; 
    }
    catch(err){
        console.log("Error: " + err);
    }
    return false;
}

const getProductComments = async (id)  =>{
    try{
        const selectedComment = require(commentPath + id + ".json");
        return selectedComment;
    }
    catch(err){
          console.log("Error: " + err);
    }
    return false;
}

module.exports = {
  getProduct,
  getProductComments
};
