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
    connectionFormat: "+srv",
  },
  auth: {
    secret: process.env.SECRET,
  },
  client: {
    host: process.env.NODE_ENV === "production" ? process.env.FRONT_HOST : "http://localhost:3000",
  },
  admin: {
    email: process.env.MY_EMAIL,
    password: process.env.MY_PASSWORD,
  },
};
