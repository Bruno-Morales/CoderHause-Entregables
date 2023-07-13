var express = require("express");
const userModel = require("../../dao/model/user.model.js");
var router = express.Router();
const {
  register,
  profile,
  logaut,
  login,
  githubLogin,
  githubCallback,
} = require("../controllers/userController.js");

const loggedUserMiddleware = require("../auth/loggedUserMiddleware.js");

const profileAuthMiddleware = require("../auth/profileAuthMiddleware.js");

const passport = require("passport");

router.get("/register", register);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "./failRegister" }),
  async (req, res) => {
    return res.redirect("./profile");
    //return res.send({ status: "Sucess", message: "User registered" });
  }
);
router.get("/failRegister", (req, res) => {
  return res.send({ status: "status", error: "autentication error" });
});

router.get("/profile", profileAuthMiddleware, profile);

router.get("/logout", logaut);
router.get("/login", loggedUserMiddleware, login);
router.get(
  "/githubLogin",
  passport.authenticate("github", { scope: ["user:email"] }),
  githubLogin
);

router.get(
  "/githubCallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  githubCallback
);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "./failLogin" }),
  async (req, res) => {
    let user = await userModel.findOne({
      email: req.body.email,
    });
    req.session.userLogged = user;
    return res.redirect("./profile");
  }
);
router.get("/failLogin", (req, res) => {
  return res.send({ status: "status", error: "autentication error" });
});

module.exports = router;
