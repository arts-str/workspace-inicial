const pool = require("../db");

const insertUser = async () => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      `INSERT INTO users (name, lastname, username, email, phone, profile_img)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ["Facundo", "Magnin", "facu", "facu@example.com", "099000000", "../img/user-icon/user.png"]
    );
    console.log("User inserted with ID:", result.insertId);
    return result.insertId; // return user id
  } catch (err) {
    console.error("Error inserting user:", err);
  } finally {
    if (conn) conn.release();
  }
}

// Run the insert
insertUser();
