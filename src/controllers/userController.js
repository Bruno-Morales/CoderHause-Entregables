const userModel = require("../../dao/model/user.model.js");

const userController = {
  register: async (req, res) => {
    res.render("register");
  },
  profile: async (req, res) => {
    return res.render("profile", {
      user: req.session.userLogged,
    });
  },
  logaut: (req, res) => {
    req.session.destroy(() => {
      return res.redirect("login");
    });
  },
  login: (req, res) => {
    res.render("login");
  },
  githubLogin: async (req, res) => {
    let user = await userModel.findOne({
      email: req.body.email,
    });
    let { first_name, last_name, rol } = user;
    req.session.userLogged = user;
    return res.redirect("profile");
  },
  githubCallback: async (req, res) => {
    let user = await userModel.findOne({
      email: req.body.email,
    });
    req.session.userLogged = user;
    return res.redirect("profile");
  },
};

module.exports = userController;
