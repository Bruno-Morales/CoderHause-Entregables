const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const userModel = require("../../dao/model/user.model.js");

router.get("/", async (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  let usuario = await userModel
    .findOne({
      email: req.body.email,
    })
    .then((usuario) => {
      if (usuario == null) {
        return res.render("login");
      }

      const comparePassword = bcryptjs.compareSync(
        req.body.password,
        usuario.password
      );

      if (comparePassword) {
        //borro password del usuario por seguridad

        req.session.userLogged = usuario;

        if (req.body.recordar) {
          res.cookie("coockieEmail", usuario.email, { maxAge: 1000 * 60 * 5 });
        }
        return res.redirect("profile");
      } else {
        return res.render("login");
      }
    });
});

module.exports = router;
