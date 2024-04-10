const router = require("express").Router();
const moviesController = require('../controller/moviesController');

router.get("/movies-popular", moviesController.getMoviesPopular.bind(moviesController));
router.get("/movies-now-playing", moviesController.getMoviesNowPlaying.bind(moviesController));
router.get("/serial-popular", moviesController.getSerialPopular.bind(moviesController));

module.exports = { router };
