
const cartPath= "../data/userCart/";

const getCartItem = async (id)  =>{
    try{
        const selectedCart = require(cartPath + id + ".json");
        return selectedCart;
    }
    catch(err){
        console.log(err);

    }
    return false;

}

const pool = require("../db");

const getCart = async(userId) =>{
    const conn = await pool.getConnection();
    try{
        const cart = await conn.query(
            'SELECT * FROM cart WHERE user_id = ?',
            [userId]
        );
        return cart;
    } catch(err){
        console.log("Error al traer el carrito:", err);
        throw err;
    } finally {
        if (conn) conn.release();
    }
};

const insertCartItems = async (userId, item) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    
    await conn.query(
      `INSERT INTO cart (user_id, product_id, quantity)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
      [userId, item.product_id, item.quantity]
    );

    await conn.commit();

    return {
      status: "ok",
      message: "Cart updated",
      product_id: item.product_id,
      quantity: item.quantity
    };

  } catch (err) {
    await conn.rollback();
    console.error("Error inserting/updating cart items:", err);

    return {
      status: "error",
      message: "Cart update failed",
      error: err
    };
  } finally {
    if (conn) conn.release();
  }
};


const deleteCartItem = async (userId, productId) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const result = await conn.query(
      `DELETE FROM cart WHERE user_id = ? AND product_id = ?`,
      [userId, productId]
    );

    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    console.error("Error deleting cart item:", err);
    throw err;
  } finally {
    conn.release();
  }
};

const modifyCartItemAmount = async (userId, productId, quantity) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const result = await conn.query(
      `UPDATE cart 
       SET quantity = ? 
       WHERE user_id = ? AND product_id = ?`,
      [quantity, userId, productId]
    );

    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    console.error("Error updating cart item:", err);
    throw err;
  } finally {
    conn.release();
  }
};

const deleteCart = async (userId) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const result = await conn.query(
      `DELETE FROM cart WHERE user_id = ?`,
      [userId]
    );

    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    console.error("Error deleting cart item:", err);
    throw err;
  } finally {
    conn.release();
  }
};


module.exports = {
  getCartItem,
  getCart,
  insertCartItems,
  deleteCartItem,
  deleteCart,
  modifyCartItemAmount
};