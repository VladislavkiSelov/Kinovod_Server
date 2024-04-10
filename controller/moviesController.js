const axios = require("axios");
const { tmdb } = require("../config/default");

class MoviesController {
  constructor() {
    this.movies = [];
  }

  async getMoviesPopular(req, res) {
    axios
      .get(`${tmdb.url}/3/movie/popular?language=ru&page=1`, {
        headers: {
          Authorization: `Bearer ${tmdb.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        res.status(200).json(response.data.results);
      })
      .catch((error) => {
        console.error(error);
        res.send(404, `not found movies popular`);
      });
  }

  async getMoviesNowPlaying(req, res) {
    axios
      .get(`${tmdb.url}/3/movie/now_playing?language=ru&page=1`, {
        headers: {
          Authorization: `Bearer ${tmdb.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        res.status(200).json(response.data.results);
      })
      .catch((error) => {
        console.error(error);
        res.send(404, `not found movies now playing`);
      });
  }

  async getSerialPopular(req, res) {
    axios
      .get(`${tmdb.url}/3/tv/popular?language=ru&page=1`, {
        headers: {
          Authorization: `Bearer ${tmdb.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        res.status(200).json(response.data.results);
      })
      .catch((error) => {
        console.error(error);
        res.send(404, `not found movies now playing`);
      });
  }
}

module.exports = new MoviesController();
