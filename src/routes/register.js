var express = require("express");
const userModel = require("../../dao/model/user.model.js");

const passport = require("passport");
var router = express.Router();

router.get("/", async (req, res) => {
  res.render("register");
});
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/failRegister" }),
  async (req, res) => {
    return res.send({ status: "Sucess", message: "User registered" });
  }
);
router.get("/failRegister", (req, res) => {
  return res.send({ status: "status", error: "autentication error" });
});
module.exports = router;
// try {
//   const userExist = await userModel.findOne({
//     email: req.body.email,
//   });
//   if (userExist) {
//     return res
//       .status(404)
//       .send({ status: "Error", error: "User already exist" });
//   }
//   //para ver la clave
//   //console.log(req.body.password);
//   const user = {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     role: "user",
//     password: bcrypt.hashSync(req.body.password, 10),
//   };
//   console.log(user);
//   if (user.email === "bruno@hotmail.com") {
//     const userAdmin = {
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email: req.body.email,
//       role: "Administrador",
//       password: bcrypt.hashSync(req.body.password, 10),
//     };
//     await userModel.create(userAdmin);
//     return res.redirect("profile");
//   }
//   await userModel.create(user);
//   return res.redirect("profile");
// } catch (error) {
//   console.log(error);
// }
