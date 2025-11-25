const fs = require("fs");
const path = require("path");
const pool = require("./db"); // Your MariaDB pool

const importProducts = async () => {
  const directory = path.join(__dirname, "data", "cats");
  const files = fs.readdirSync(directory).filter(f => f.endsWith(".json"));

  // Read all JSON files
  const categories = files.map(f => {
    const raw = fs.readFileSync(path.join(directory, f), "utf8");
    return JSON.parse(raw);
  });

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // Insert all categories first
    for (const c of categories[0]) {
      console.log(c.name);
      
      await conn.query(
        `INSERT INTO categories (id, name, description, article_amount)
         VALUES (?, ?, ?, ?)`,
        [c.id, c.name, c.description, c.productCount]
      );
    }

    // Insert all categories images
    for (const c of categories[0]) {
      await conn.query(
        `INSERT INTO categories_images (category_id, image_url)
         VALUES (?, ?)`,
        [c.id, c.imgSrc]
      );
      
    }

    await conn.commit();
    console.log("All categories, images imported successfully!");

  } catch (err) {
    await conn.rollback();
    console.error("Import failed:", err);
  } finally {
    if (conn) conn.release();
  }
}

// Run the importer
importProducts();
