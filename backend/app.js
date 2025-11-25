const express = require("express"); // Importa ExpressJS.
const cors = require("cors");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "XkiO0pUPIPSJadlXh4bw6Q6GYX4SN5Hh"

const app = express(); // Crea una instancia de ExpressJS

const port = 3000;

app.use(cors());

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

app.use("/api", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

app.use("/api/products", productRouter);

app.use("/api/cart", cartRouter);

app.use("/api/category", categoryRouter);




app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(400).json({ message: "Credenciales inválidas" });
  }
})

// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
