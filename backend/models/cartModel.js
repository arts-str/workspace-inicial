
const cartPath= "../data/userCart/";

const getCart = async (id)  =>{
    try{
        const selectedCart = require(cartPath + id + ".json");
        return selectedCart;
    }
    catch(err){
        console.log(err);

    }
    return false;

}


module.exports = {
  getCart
};