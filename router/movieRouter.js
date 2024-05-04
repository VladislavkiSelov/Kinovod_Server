const router = require("express").Router();
const movieController = require("../controller/movieController");
const { assignToken } = require("../helpFunction/assignToken");
const { checkTokenExists } = require("../helpFunction/checkTokenExists");
const { validateUserData, validateUserDataEdit } = require("../middleware/validationUser");

router.post("/favorite", checkTokenExists, movieController.addFavorite.bind(movieController), (req, res) => {
  res.send(200);
});

router.get("/favorite", checkTokenExists, movieController.getFavorite.bind(movieController), (req, res) => {
  res.send(200, { movies: req.movies.favoritedMovie });
});

router.delete("/favorite", checkTokenExists, movieController.deleteFavorite.bind(movieController), (req, res) => {
  res.send(200);
});

module.exports = { router };
