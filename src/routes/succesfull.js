var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  return res.send("succesfull");
});

module.exports = router;
