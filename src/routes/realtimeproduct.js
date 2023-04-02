var express = require("express");
var router = express.Router();
const ProductManager = require("../../Product-Managger");
const socket = require("../../socket");

const productManager = new ProductManager();

router.get("/", async (req, res) => {
  let products = await productManager.getProducts();
  res.render("realtimeproducts", { products });
});

module.exports = router;
