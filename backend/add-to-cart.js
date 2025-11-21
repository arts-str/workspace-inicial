const pool = require("./db");

const insertCartItems = async (userId, items) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    for (const item of items) {
      await conn.query(
        `INSERT INTO cart (user_id, product_id, quantity)
         VALUES (?, ?, ?)`,
        [userId, item.product_id, item.quantity]
      );
    }

    await conn.commit();
    console.log("Cart items inserted successfully!");
  } catch (err) {
    await conn.rollback();
    console.error("Error inserting cart items:", err);
  } finally {
    if (conn) conn.release();
  }
}

const items = [
      { product_id: 50744, quantity: 1 },
      { product_id: 50741, quantity: 2 }
    ];

// Example usage: user ID = 1
insertCartItems(1, items);

module.exports = {
  insertCartItems
};
