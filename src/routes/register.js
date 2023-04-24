var express = require("express");
const userModel = require("../../dao/model/user.model.js");
var router = express.Router();

router.get("/", async (req, res) => {
  res.render("register");
});

router.post("/create", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res
        .status(404)
        .send({ status: "Error", error: "User already exist" });
    }
    const user = {
      first_name,
      last_name,
      email,
    };

    await userModel.create(user);
    return res.send({ status: "Sucess", message: "User registered" });
  } catch (error) {
    console.log(error);
  }

  return res.send("succesfull");
});

module.exports = router;
