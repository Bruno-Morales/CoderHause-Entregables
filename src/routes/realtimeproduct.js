var express = require("express");
var router = express.Router();
const ProductManager = require("../../Product-Managger");

const productManager = new ProductManager();

router.get("/", async (req, res) => {
  //Para corroborar que no este la lista vacía.[0]
  res.render("realtimeproducts", {});
});

module.exports = router;
