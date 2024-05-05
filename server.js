require("dotenv").config();
const config = require("config");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const { router: authRouter } = require("./router/authRouter");
const { router: userRouter } = require("./router/userRouter");
const { router: movieRouter } = require("./router/movieRouter");
const { client } = require("./config/default");

const server = express();
const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`server start port ${port}`));

server.use(cors());

morgan.token("errorMessage", function (req, res) {
  return req.error || "";
});

server.use(morgan(`:method :url :status :errorMessage`));

server.use(bodyParser.json());
server.use("/auth", authRouter);
server.use("/user", userRouter);
server.use("/movie", movieRouter);
