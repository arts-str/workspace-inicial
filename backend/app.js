const express = require("express"); // Importa ExpressJS.

const app = express(); // Crea una instancia de ExpressJS

const port = 3000;

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

const productPath = "./products/";
const commentsPath = "./productsComments/";

app.get("/products/:id", (req, res) => {
  try{
    const selectedProduct = require(productPath + req.params.id + ".json");
    
    res.json(selectedProduct);
  }
  catch(err){
    res.status(404).json({error: "Producto no encontrado"});
  }
});

app.get("/products-comments/:id", (req, res) => {
  try{
    const selectedComment = require(commentsPath + req.params.id + ".json");
    res.json(selectedComment);
  }
  catch(err){
    res.status(404).json({error: "Comentario no encontrado"});
  }
});


// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
