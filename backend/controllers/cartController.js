const cartModel = require("../models/cartModel");

const getCartItem = async (req, res)  =>{
  const id = parseInt(req.params.id)
  const cart = await cartModel.getCartItem(id);
  res.json(cart);
}

const getCart = async(req, res) =>{
  const user_id = req.headers["user_id"];
  if (user_id) {
    const cart = await cartModel.getCart(user_id);
    res.json(cart);
  }else{
    res.status(404).json({message: "Usuario no encontrado"});
  }
}

const insertCartItems = async (req, res)  =>{

    const item = req.body;    
    const user_id = req.headers["user_id"];
    if (user_id) {
      const cart = await cartModel.insertCartItems(user_id, item);
      res.json(cart);
    }else{
      res.status(404).json({message: "Usuario no encontrado"});
    }
};

const deleteCartItem = async (req, res)  =>{

  const user_id = req.headers["user_id"];
  const product_id = req.params.id;

  if (!user_id) {
    return res.status(400).json({ message: "User ID header missing" });
  }

  if (!product_id) {
    return res.status(400).json({ message: "Product ID missing" });
  }

  try {
    const result = await cartModel.deleteCartItem(user_id, product_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const modifyCartItemAmount = async (req, res) => {
  const user_id = req.headers["user_id"];
  const product_id = req.params.id;
  const { quantity } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "User ID header missing" });
  }

  if (!product_id) {
    return res.status(400).json({ message: "Product ID missing" });
  }

  if (quantity == null || quantity < 1) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  try {
    const result = await cartModel.modifyCartItemAmount(user_id, product_id, quantity);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.json({ message: "Quantity updated", product_id, quantity });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  getCartItem,
  getCart,
  insertCartItems,
  deleteCartItem,
  modifyCartItemAmount
};