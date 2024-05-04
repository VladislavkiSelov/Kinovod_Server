const { Movie } = require("../connectionMongoose");
const logger = require("../utils/logger");

class movieController {
  constructor() {}
  async addFavorite(req, res, next) {
    const { movie_id, user_id, type } = req.body;

    try {
      const movieExists = await Movie.exists({ user_id, "favoritedMovie.movie_id": movie_id });

      if (movieExists) {
        res.status(400).json({ message: "Фильм уже добавлен в избранное" });
        return;
      }

      await Movie.findOneAndUpdate({ user_id }, { $addToSet: { favoritedMovie: { movie_id, type } } }, { upsert: true });

      next();
    } catch (err) {
      logger("addFavorite").error(err);
      res.status(500).json({ error: "Произошла ошибка сервера" });
    }
  }

  async getFavorite(req, res, next) {
    const { user_id } = req.query;

    try {
      req.movies = await Movie.findOne({ user_id });
      next();
    } catch (err) {
      logger("getFavorite").error(err);
      res.send(404);
    }
  }

  async deleteFavorite(req, res, next) {
    const { movie_id, user_id } = req.query;

    try {
      await Movie.updateOne({ user_id }, { $pull: { favoritedMovie: { movie_id } } });
      next();
    } catch (err) {
      logger("deleteFavorite").error(err);
      res.send(404, "movie not found");
    }
  }
}

module.exports = new movieController();
