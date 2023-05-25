var express = require("express");
var router = express.Router();
const userModel = require("../../dao/model/user.model.js");
const indexController = require("../controllers/indexController.js");
// const ProductManager = require("../../Product-Managger");

// const productManager = new ProductManager();

router.get("/", indexController.index);

router.post("/create", indexController.userCreate);

router.delete("/delete/:id", indexController.delete);

module.exports = router;
