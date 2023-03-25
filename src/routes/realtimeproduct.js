var express = require("express");
var router = express.Router();
const ProductManager = require("../../Product-Managger");
const socket = require("../../socket");

const productManager = new ProductManager();

router.get("/", async (req, res) => {
  let products = await productManager.getProducts();

  socket.io.on("product_ad", async (data) => {
    let products = await productManager.getProducts();
    products.push(data);
    console.log(data);
    res.render("realtimeproducts", { products });
  });
  //Para corroborar que no este la lista vacía.[0]
  res.render("realtimeproducts", { products });
});

module.exports = router;
