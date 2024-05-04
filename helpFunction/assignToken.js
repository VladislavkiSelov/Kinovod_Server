const logger = require("../utils/logger");
const { issueJwt } = require("./auth");

const assignToken = (req, res, next) => {
  try {
    const token = issueJwt({ id: req.user.id });
    req.token = token;
    next();
  } catch (err) {
    logger("assignToken").error(err);
  }
};

module.exports = {
  assignToken,
};
