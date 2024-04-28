module.exports = {
  server: {
    port: process.env.PORT,
  },
  tmdb: {
    token: process.env.TOKEN_TMDB,
    url: process.env.URL_TMDB,
  },
  db: {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    connectionFormat: process.env.NODE_ENV === "develop" ? "+srv" : "",
  },
};
