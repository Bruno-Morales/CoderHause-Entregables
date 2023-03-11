var express = require("express");
var router = express.Router();
const ProductManager = require("../../Primer-Entregable");

const productManager = new ProductManager();

router.get("/", async (req, res) => {});

router.get("/:id", async (req, res) => {});

module.exports = router;
