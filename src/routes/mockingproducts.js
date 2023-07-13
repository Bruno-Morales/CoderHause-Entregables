var express = require("express");
var router = express.Router();
const mockingproductsController = require("../controllers/mockingproductsController");

router.get("/", mockingproductsController.totalFaker);

module.exports = router;
