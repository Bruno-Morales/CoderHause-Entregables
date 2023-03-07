const express = require("express");
const app = express();
const ProductManager = require("./Primer-Entregable");

const productManager = new ProductManager();

app.get("/products", async (req, res) => {
  let limit = req.query.limit;

  let consulta = await productManager.getProducts();

  //Para corroborar que no este la lista vacía.

  if (!limit) {
    if (!consulta) {
      return res.send("No hay productos para mostrar");
    }
    res.send(console.log(consulta));
    return;
  }

  //array para guardar dependiendo del limite que se pide por el parametro "?limit="

  let newArray = [];

  for (let i = 0; i <= limit; i++) {
    newArray.push(consulta[i - 1]);
  }
  res.send(console.log(newArray));
});

app.get("/products/:id", async (req, res) => {
  let product = req.params.id;

  console.log(product);

  let segundaConsulta = await productManager.getProducts();

  let primeraConsulta = await productManager.getProductById(
    JSON.parse(product)
  );

  //console.log(primeraConsulta);

  //console.log(primeraConsulta.length);

  if (!segundaConsulta) {
    return res.send("No hay productos en el archivo.");
  }
  if (!primeraConsulta) {
    return res.send("No hay productos con ese ID.");
  }
  console.log(primeraConsulta);
  res.send(primeraConsulta);
});

app.listen(3000);
