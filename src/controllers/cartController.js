var express = require("express");
var router = express.Router();
const cartsModel = require("../../dao/model/carts.model.js");
// const CartManager = require("../../Cart-Managger");

const cartController = {
  index: async (req, res) => {
    const carts = await cartsModel.find().populate("products.product");

    return res.send({ status: "Success", pyload: carts });
  },
  cartCreate: async (req, res) => {
    const cart = req.body;
    const createdCart = await cartsModel.create(cart);
    return res.send(createdCart);
  },
  cartForId: async (req, res) => {
    let cartid = req.params.id;
    const cart = await cartsModel
      .findOne({ _id: cartid })
      .populate("products.product");

    return res.send({ status: "Success", pyload: cart });
  },
  cartAndProductForId: async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = 1;

    let enviar = await cartsModel.updateOne(
      { _id: cartId },
      { $push: { products: [{ product: productId, quantity }] } }
    );

    return res.send({ status: "Success", pyload: enviar });
  },
  cartForId: async (req, res) => {
    let cartid = req.params.id;
    const cart = await cartsModel
      .findOne({ _id: cartid })
      .populate("products.product");

    return res.send({ status: "Success", pyload: cart });
  },
  cartForId: async (req, res) => {
    let cartid = req.params.id;
    const cart = await cartsModel
      .findOne({ _id: cartid })
      .populate("products.product");

    return res.send({ status: "Success", pyload: cart });
  },

  delete: async (req, res) => {},
};

module.exports = cartController;

// const cartManager = new CartManager();
