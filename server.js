require("dotenv").config();
const config = require("config");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const morgan = require("morgan");

const { router: moviesRouter } = require("./router/moviesRouter");

const server = express();
const { port } = config.server;
server.listen(port, () => console.log(`server start port ${port}`));

server.use(cors());

morgan.token("errorMessage", function (req, res) {
    return req.error || "";
  });
server.use(morgan(`:method :url :status :errorMessage`));

server.use(bodyParser.json());
server.use("/", moviesRouter);