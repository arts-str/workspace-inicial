const fs = require("fs");
const path = require("path");
const pool = require("../db"); // Your MariaDB pool

const importProducts = async () => {
  const directory = path.join(__dirname, "data", "productsComments");
  const files = fs.readdirSync(directory).filter(f => f.endsWith(".json"));

  // Read all JSON files
  const comments = files.map(f => {
    const raw = fs.readFileSync(path.join(directory, f), "utf8");cd
    return JSON.parse(raw);
  });

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // Insert all comments first
    for (const cPool of comments) {    
        for (const c of cPool) {
          
          await conn.query(
          `INSERT INTO scores (username, product_id, rating, comment, timestamp)
           VALUES (?, ?, ?, ?, ?)`,
          [c.user, c.product, c.score, c.description, c.dateTime]
          );
            
        }
      
    }

    await conn.commit();
    console.log("All comments imported successfully!");

  } catch (err) {
    await conn.rollback();
    console.error("Import failed:", err);
  } finally {
    if (conn) conn.release();
  }
}

// Run the importer
importProducts();
