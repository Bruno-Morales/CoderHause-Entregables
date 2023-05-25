var express = require("express");
var router = express.Router();
const productsModel = require("../../dao/model/products.model.js");
const productsController = require("../controllers/productController");

router.get("/", productsController.index);

router.post("/", productsController.productsCreate);

router.get("/productid/:id", productsController.forId);

module.exports = router;
