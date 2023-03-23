var express = require("express");
var router = express.Router();
var path = require("path");

const ProductManager = require("../../Product-Managger");

const productManager = new ProductManager();

router.get("/", async (req, res) => {
  let products = await productManager.getProducts();
  //Para corroborar que no este la lista vacía.[0]
  res.render("home", { products });
});

module.exports = router;
