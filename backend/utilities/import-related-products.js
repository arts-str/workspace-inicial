const fs = require("fs");
const path = require("path");
const pool = require("../db"); // Your MariaDB pool

const importRelatedProducts = async() => {
  const directory = path.join(__dirname, "data", "products");
  const files = fs.readdirSync(directory).filter(f => f.endsWith(".json"));

  // Read all JSON files
  const products = files.map(f => {
    const raw = fs.readFileSync(path.join(directory, f), "utf8");
    return JSON.parse(raw);
  });

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // Insert only related products
    for (const p of products) {
      for (const rel of p.relatedProducts) {
        // Foreign key exists check (should pass now)
        const [exists] = await conn.query(
          `SELECT id FROM products WHERE id = ?`,
          [rel.id]
        );

        if (exists.length === 0) {
          console.warn(`Related product ${rel.id} does not exist, skipping`);
          continue;
        }

        await conn.query(
          `INSERT INTO related_products (product_id, related_id)
           VALUES (?, ?)
           ON DUPLICATE KEY UPDATE related_id = VALUES(related_id)`,
          [p.id, rel.id]
        );
      }
    }

    await conn.commit();
    console.log("Related products imported successfully!");

  } catch (err) {
    await conn.rollback();
    console.error("Import failed:", err);
  } finally {
    if (conn) conn.release();
  }
}

// Run the importer
importRelatedProducts();
