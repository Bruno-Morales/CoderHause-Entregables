var express = require("express");
var router = express.Router();
const CartManager = require("../../Cart-Managger");

const cartManager = new CartManager();

router.post("/", async (req, res) => {
  const cart = {
    product: req.body.product,
  };

  await cartManager.addCart(cart.product);
  return console.log("Successfull");
});

router.get("/:id", async (req, res) => {
  let cart = req.params.id;

  let segundaConsulta = await cartManager.getCarts();

  let primeraConsulta = await cartManager.getCartById(JSON.parse(cart));
  //console.log(primeraConsulta);
  //console.log(primeraConsulta.length);
  if (!segundaConsulta) {
    return res.send("No hay productos en el carrito.");
  }
  res.send(primeraConsulta);
});

router.post("/:id/product/:pid", async (req, res) => {
  let cart = req.params.id;
  let product = req.params.pid;
  let primeraConsulta = await cartManager.addProductAtCart(
    JSON.parse(cart),
    JSON.parse(product)
  );
  //console.log(primeraConsulta);
  //console.log(primeraConsulta.length);

  res.sendStatus(202);
});

module.exports = router;
