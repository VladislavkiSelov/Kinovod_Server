const { verifyJwt } = require("./auth");

function checkTokenExists(req, res, next) {
  const token = req.headers["authorization"].split(' ')[1];

  const user = verifyJwt(token);

  if (!user) {
    req.user = {};
    next();
  }

  req.user = user;
  next();
}

module.exports = {
  checkTokenExists,
};
