var express = require("express");
const userModel = require("../../dao/model/user.model.js");
var router = express.Router();
const userController = require("../controllers/userController.js");

const passport = require("passport");

router.get("/register", userController.register);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "user/failRegister" }),
  async (req, res) => {
    return res.send({ status: "Sucess", message: "User registered" });
  }
);
router.get("/failRegister", (req, res) => {
  return res.send({ status: "status", error: "autentication error" });
});

router.get("/profile", userController.profile);

router.get("/logout", userController.logaut);
router.get("/login", userController.login);
router.get(
  "/login/githubLogin",
  passport.authenticate("github", { scope: ["user:email"] }),
  userController.githubLogin
);

router.get(
  "/githubCallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  userController.githubCallback
);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "user/failLogin" }),
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

module.exports = router;
