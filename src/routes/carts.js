var express = require("express");
var router = express.Router();
const cartsModel = require("../../dao/model/carts.model.js");
// const CartManager = require("../../Cart-Managger");
const {
  index,
  cartCreate,
  cartForId,
  cartAndProductForId,
} = require("../controllers/cartController.js");

// const cartManager = new CartManager();

router.get("/", index);

//crear carrito.
router.post("/", cartCreate);

//buscar carrito por id
router.get("/:id", cartForId);

//agregar producto al carrito .
router.post("/:cid/product/:pid/", cartAndProductForId);

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
