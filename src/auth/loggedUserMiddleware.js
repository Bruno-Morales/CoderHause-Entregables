// si hay alguien en session se redirigira a el home
function loggedUser(req, res, next) {
  if (req.session.userLogged) {
    return res.redirect("./profile");
  }
  return next();
}

module.exports = loggedUser;
