var express = require("express");
var router = express.Router();
const CartManager = require("../../Cart-Managger");

const cartManager = new CartManager();

router.post("/", async (req, res) => {
  await cartManager.addCart();
  return res.send("Cart created Successfull");
});

router.get("/:id", async (req, res) => {
  let cart = req.params.id;

  let segundaConsulta = await cartManager.getCarts();
  let primeraConsulta = await cartManager.getCartById(JSON.parse(cart));
  //console.log(primeraConsulta);
  //console.log(primeraConsulta.length);

  if (primeraConsulta === undefined) {
    return res.sendStatus(404, "Cart not Found!");
  }
  res.send(primeraConsulta);
});

router.post("/:id/product/:pid", async (req, res) => {
  let cart = req.params.id;
  let product = req.params.pid;
  await cartManager.addProductAtCart(JSON.parse(cart), JSON.parse(product));
  //console.log(primeraConsulta);
  //console.log(primeraConsulta.length);
  res.send("Products add successfull");
});

module.exports = router;
