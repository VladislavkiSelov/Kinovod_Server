const router = require("express").Router();
const userController = require("../controller/userController");
const { assignToken } = require("../helpFunction/assignToken");
const { checkTokenExists } = require("../helpFunction/checkTokenExists");
const { validateUserData } = require("../middleware/validationUser");

router.post("/register", validateUserData, userController.createUser.bind(userController), assignToken, (req, res) => {
  res.send(200, { id: req.user.id, token: req.token });
});

router.post("/reset_password", userController.resetPasswordUser.bind(userController), (req, res) => {
  res.send(200);
});

router.post("/set_password", checkTokenExists, userController.setPasswordUser.bind(userController), (req, res) => {
  res.send(200);
});

router.get("/login", userController.getUser.bind(userController), assignToken, (req, res) => {
  res.send(200, { id: req.user.id, token: req.token });
});

router.get("/token", userController.findIdUser.bind(userController), assignToken, (req, res) => {
  res.send(200, { id: req.user.id, token: req.token });
});

module.exports = { router };
