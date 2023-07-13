function profileAuth(req, res, next) {
  if (!req.session.userLogged) {
    return res.redirect("./login");
  }
  next();
}

module.exports = profileAuth;
