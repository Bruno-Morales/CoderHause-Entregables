var express = require("express");
var router = express.Router();
const cartsModel = require("../../dao/model/carts.model.js");
// const CartManager = require("../../Cart-Managger");

// const cartManager = new CartManager();

router.get("/", async (req, res) => {
  const carts = await cartsModel.find();
  return res.send(carts);
});

//crear carrito.
router.post("/", async (req, res) => {
  const cart = req.body;
  const createdCart = await cartsModel.create(cart);
  return res.send(createdCart);
  // await cartManager.addCart();
  // return res.send("Cart created Successfull");
});

//buscar carrito por id
router.get("/:id", async (req, res) => {
  let cartid = req.params.id;
  const cart = await cartsModel
    .findOne({ _id: cartid })
    .populate("products.product");
  // console.log(cart.products[0].product.title);

  let totales = [];

  for (i = 0; i < cart.products.length; i++) {
    totales.push(cart.products[i].product.title);
  }
  // console.log(totales);
  // console.log(cart);
  // console.log("--------------");

  return res.render("carts", { cart: cart.products });
});

//agregar producto al carrito .
router.post("/:cid/product/:pid/", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = 1;

  await cartsModel.updateOne(
    { _id: cartId },
    { $push: { products: [{ product: productId, quantity }] } }
  );

  return res.redirect("/succesfull");
  // let cart = req.params.id;
  // let product = req.params.pid;
  // await cartManager.addProductAtCart(JSON.parse(cart), JSON.parse(product));
  // console.log(primeraConsulta);
  // console.log(primeraConsulta.length);
  // res.send("Products add successfull");
});

router.put("/:cid/product/:pid/", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  await cartsModel.updateOne(
    { _id: cartId },
    { $push: { products: [{ product: productId }] } }
  );

  return res.redirect("/succesfull");
});

router.delete("/:cid/product/:pid/", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  await cartsModel.deleteOne({ _id: cartId }, { product: productId });
  return res.send("Product deleted!");
});

router.delete("/:cid/", async (req, res) => {
  const cartId = req.params.cid;
  await cartsModel.deleteMany({ _id: cartId });
  return res.send("Cart deleted!");
});

module.exports = router;
