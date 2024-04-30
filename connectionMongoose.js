const { db } = require("config");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);
const mongoUrl = `mongodb${db.connectionFormat}://${db.user}:${db.pass}@${db.host}/${db.name}?retryWrites=true&w=majority`;

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
};
