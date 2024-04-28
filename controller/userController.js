const { User } = require("../connectionMongoose");

class userController {
  constructor() {}

  async createUser(req, res) {
    const { password, email, username } = req.body;
    try {
      req.user = await User.create({ password, email, username });
      res.send(200, "The user has been created!");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new userController();
