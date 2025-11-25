const fs = require("fs");
const path = require("path");
const pool = require("../db"); // Your MariaDB pool

const importProducts = async () => {
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

    // Insert all products first
    for (const p of products) {
      await conn.query(
        `INSERT INTO products (id, name, description, cost, currency, sold_count, category_id)
         VALUES (?, ?, ?, ?, ?, ?, (SELECT id FROM categories WHERE name=?))
         ON DUPLICATE KEY UPDATE name = VALUES(name)`,
        [p.id, p.name, p.description, p.cost, p.currency, p.soldCount, p.category]
      );
    }

    //  Insert all product images
    for (const p of products) {
      for (const img of p.images) {
        await conn.query(
          `INSERT INTO product_images (product_id, image_url)
           VALUES (?, ?)
           ON DUPLICATE KEY UPDATE image_url = VALUES(image_url)`,
          [p.id, img]
        );
      }
    }

    //  Insert all related products
    for (const p of products) {
      for (const rel of p.relatedProducts) {
        // Only insert if the related product actually exists
        const [exists] = await conn.query(
          `SELECT id FROM products WHERE id = ?`,
          [rel.id]
        );
        if (exists.length > 0) {
          await conn.query(
            `INSERT INTO related_products (product_id, related_id)
             VALUES (?, ?)
             ON DUPLICATE KEY UPDATE related_id = VALUES(related_id)`,
            [p.id, rel.id]
          );
        } else {
          console.warn(`Related product ${rel.id} for ${p.id} does not exist yet`);
        }
      }
    }

    await conn.commit();
    console.log("All products, images, and related products imported successfully!");

  } catch (err) {
    await conn.rollback();
    console.error("Import failed:", err);
  } finally {
    if (conn) conn.release();
  }
}

// Run the importer
importProducts();
