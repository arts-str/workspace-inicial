const express = require("express"); // Importa ExpressJS.
const cors = require("cors");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const categoryRouter = require("./routes/categoryRoutes");

const app = express(); // Crea una instancia de ExpressJS

const port = 3000;

app.use(cors());

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

app.use("/products", productRouter);

app.use("/cart", cartRouter);

app.use("/category", categoryRouter);


// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
