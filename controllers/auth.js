module.exports = {
  ensureAuth: (req, res, next) => {
    //#swagger.tags=["auth"]
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
};
