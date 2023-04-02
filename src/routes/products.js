var express = require("express");
var router = express.Router();
const multer = require("multer");
var path = require("path");

const ProductManager = require("../../Product-Managger");

const productManager = new ProductManager();

router.post("/", async (req, res) => {
  const products = await productManager.getProducts();

  const product = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    thumbnails: req.body.thumbnails,
    code: req.body.code,
    stock: req.body.stock,
    category: req.body.category,
  };

  let consulta1 = await productManager.addProduct(
    product.title,
    product.description,
    product.price,
    product.thumbnails,
    product.code,
    product.stock,
    product.category
  );

  return res.send(consulta1);
});

router.get("/", async (req, res) => {
  let limit = req.query.limit;

  let consulta = await productManager.getProducts();

  //Para corroborar que no este la lista vacía.

  if (!limit) {
    if (!consulta) {
      return res.send("No hay productos para mostrar");
    }
    res.send(consulta);
    return;
  }
  let parseado = JSON.parse(limit);

  let numeroreal = consulta[parseado - 1];

  const newconsult = consulta.splice(numeroreal, limit);

  res.send(newconsult);
});

router.get("/:id", async (req, res) => {
  let product = req.params.id;

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

  res.send(primeraConsulta);
});

router.put("/:id", async (req, res) => {
  let product = req.params.id;
  let variable = await productManager.updateProduct(
    JSON.parse(product),
    req.body.campo,
    req.body.newDate
  );
  console.log(variable);
  if (variable === undefined) {
    return res.send("Producs not Found");
  }
  if (variable === true) {
    return res.send("Successfull");
  }
});

router.delete("/:id", async (req, res) => {
  let product = req.params.id;
  let productdelete = await productManager.deleteProduct(JSON.parse(product));

  if (productdelete === true) {
    res.send("Successfull");
  } else {
    res.send("Product Not Found");
  }
});

module.exports = router;
