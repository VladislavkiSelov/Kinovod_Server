const { User } = require("../connectionMongoose");
const { hashPassword, checkPassword } = require("../helpFunction/auth");
const logger = require("../utils/logger");

class userController {
  constructor() {}

  async createUser(req, res, next) {
    const { password, email, username } = req.body;
    const hasgpassword = await hashPassword(password);

    try {
      req.user = await User.create({ password: hasgpassword, email, username });
      next();
    } catch (err) {
      logger("createUser").error(err);
    }
  }

  async getUser(req, res, next) {
    const { password, email } = req.query;

    try {
      const user = await User.findOne({ email });
      const passwordMatch = await checkPassword(password, user.password);
      req.user = user;

      if (!passwordMatch) {
        throw new Error("Error password");
      }

      next();
    } catch (err) {
      logger("findUser").error(err);
      res.send(400);
    }
  }

  async findIdUser(req, res, next) {
    const { id } = req.query;

    try {
      const user = await User.findById(id);
      req.user = user;
      next();
    } catch (err) {
      logger("findUser").error(err);
      res.send(400);
    }
  }
}

module.exports = new userController();
