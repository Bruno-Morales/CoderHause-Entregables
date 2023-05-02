var express = require("express");
const userModel = require("../../dao/model/user.model.js");
var router = express.Router();

router.get("/", async (req, res) => {
  if (!req.session.userLogged) {
    return res.redirect("login");
  }
  //para entrar como administrador
  return res.render("profile", {
    user: req.session.userLogged,
  });
}),
  router.get("/logout", async (req, res) => {
    req.session.destroy(() => {
      res.redirect("../login");
    });
  });

module.exports = router;
