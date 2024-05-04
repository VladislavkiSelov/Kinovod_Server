const { db } = require("config");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const movieSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  favoritedMovie: [{ movie_id: { type: String, required: true }, type: { type: String, required: true } }],
});

const User = mongoose.model("users", userSchema);
const Movie = mongoose.model("movies", movieSchema);

const mongoUrl = `mongodb${db.connectionFormat}://${db.user}:${db.pass}@${db.host}/?retryWrites=true&w=majority&appName=${db.name}`;

async function connectionMongoose() {
  try {
    await mongoose.connect(mongoUrl, { dbName: db.name });
    console.log("mongo good");
  } catch (err) {
    console.warn("mongo bad!");
    console.warn(err);
  }
}

connectionMongoose();

module.exports = {
  User,
  Movie,
};
