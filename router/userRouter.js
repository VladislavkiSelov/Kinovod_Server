const router = require("express").Router();
const userController = require("../controller/userController");
const { assignToken } = require("../helpFunction/assignToken");
const { checkTokenExists } = require("../helpFunction/checkTokenExists");
const { validateUserData, validateUserDataEdit } = require("../middleware/validationUser");

router.get("/", checkTokenExists, userController.findIdUser.bind(userController), (req, res) => {
  const { username, email } = req.user;
  res.send(200, { username, email });
});

router.patch("/edit", checkTokenExists, userController.editUser.bind(userController), (req, res) => {
  res.send(200, req.user);
});

module.exports = { router };
