const router = require("express").Router();
const userController = require("../controller/userController");
const { assignToken } = require("../helpFunction/assignToken");
const { validateUserData } = require("../middleware/validationUser");

router.post("/user", validateUserData, userController.createUser.bind(userController), assignToken, (req, res) => {
  res.send(200, { id: req.user.id, token: req.token });
});

router.get("/user", userController.getUser.bind(userController), assignToken, (req, res) => {
  res.send(200, { id: req.user.id, token: req.token });
});

router.post("/token", userController.findIdUser.bind(userController), assignToken, (req, res) => {
  res.send(200, { id: req.user.id, token: req.token });
});

module.exports = { router };
