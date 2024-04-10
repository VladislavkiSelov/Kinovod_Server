require("dotenv").config();
const config = require("config");

const express = require("express");
const server = express();
const { port } = config.server;
server.listen(port, () => console.log(`server start port ${port}`));
