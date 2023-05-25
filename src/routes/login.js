const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const userModel = require("../../dao/model/user.model.js");

const passport = require("passport");

router.get("/", async (req, res) => {
  res.render("login");
});
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    let user = await userModel.findOne({
      email: req.body.email,
    });
    let { first_name, last_name, rol } = user;
    req.session.userLogged = user;

    return res.redirect("profile", { user });
  }
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    let user = await userModel.findOne({
      email: req.body.email,
    });
    req.session.userLogged = user;

    return res.redirect("../profile");
  }
);

router.post(
  "/",
  passport.authenticate("login", { failureRedirect: "/failLogin" }),
  async (req, res) => {
    let user = await userModel.findOne({
      email: req.body.email,
    });

    req.session.userLogged = user;

    return res.redirect("profile");
  }
);
router.get("/failLogin", (req, res) => {
  return res.send({ status: "status", error: "autentication error" });
});

// router.post("/", async (req, res) => {
//   let usuario = await userModel
//     .findOne({
//       email: req.body.email,
//     })
//     .then((usuario) => {
//       if (usuario == null) {
//         return res.render("login");
//       }

//       const comparePassword = bcryptjs.compareSync(
//         req.body.password,
//         usuario.password
//       );

//       if (comparePassword) {
//         //borro password del usuario por seguridad

//         req.session.userLogged = usuario;

//         if (req.body.recordar) {
//           res.cookie("coockieEmail", usuario.email, { maxAge: 1000 * 60 * 5 });
//         }
//         return res.redirect("profile");
//       } else {
//         return res.render("login");
//       }
//     });
// });

module.exports = router;
