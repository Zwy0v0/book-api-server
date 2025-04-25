function checkRole(role) {
  return (req, res, next) => {
    //仅开发阶段放行
    // if (!req.auth) return next();

    if (req.auth && req.auth.role === role) return next();
    res.status(403).json({ message: "Only administrators have this permission" });
  };
}

module.exports = checkRole
