"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();
const cors = require("cors");

mongoose.connect(config.connectionString);

//Models load
const Event = require("./models/eventModel.js");
const User = require("./models/userModel.js");

//Routes load
const indexRoutes = require("./routes/indexRoute");
const eventsRoutes = require("./routes/eventsRoute");
const usersRoutes = require("./routes/usersRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/", indexRoutes);
app.use("/events", eventsRoutes);
app.use("/users", usersRoutes);

module.exports = app;
