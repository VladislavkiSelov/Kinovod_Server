const router = require("express").Router();
const userController = require('../controller/userController');

router.post("/user", userController.createUser.bind(userController));

module.exports = { router };
