var express = require("express");
var router = express.Router();
var path = require("path");
const userModel = require("../../dao/model/user.model.js");
// const ProductManager = require("../../Product-Managger");

// const productManager = new ProductManager();

router.get("/", async (req, res) => {
  const users = await userModel.find();

  res.send({ status: "Success", payload: users });
  // let products = await productManager.getProducts();
  // //Para corroborar que no este la lista vacía.[0]
  // res.render("home", { products });
});
router.post("/create", async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const user = {
    first_name,
    last_name,
    email,
  };

  const users = userModel.create(user);

  res.send({ status: "Success", payload: users });
  // let products = await productManager.getProducts();
  // //Para corroborar que no este la lista vacía.[0]
  // res.render("home", { products });
});

module.exports = router;
