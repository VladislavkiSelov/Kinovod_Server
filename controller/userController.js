const { auth } = require("../config/default");
const { User } = require("../connectionMongoose");
const { hashPassword, checkPassword } = require("../helpFunction/auth");
const { sendMail } = require("../helpFunction/sendMail");
const logger = require("../utils/logger");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

class userController {
  constructor() {}

  async resetPasswordUser(req, res, next) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!!user) {
        const resetToken = jwt.sign({ email }, auth.secret, { expiresIn: "15m" });
        await sendMail(email, resetToken);
        next();
      }else{
        res.send(404)
      }
    } catch (err) {
      logger("resetPasswordUser").error(err);
    }
  }

  async setPasswordUser(req, res, next) {
    const { password } = req.body;
    const hasgpassword = await hashPassword(password);
    try {
      await User.findOneAndUpdate({ email: req.user.email }, { password: hasgpassword });
      next();
    } catch (err) {
      logger("resetPasswordUser").error(err);
    }
  }

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
      logger("getUser").error(err);
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
      logger("findIdUser").error(err);
      res.send(404);
    }
  }

  async editUser(req, res, next) {
    const { id } = req.query;

    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }

    try {
      await User.updateMany({ _id: new ObjectId(id) }, { $set: req.body });
      const user = await User.findById(id);
      req.user = user;

      next();
    } catch (err) {
      logger("editUser").error(err);
      res.send(404);
    }
  }
}

module.exports = new userController();
