"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

const cors = require("cors");
const app = express();

mongoose.connect(config.connectionString);

//Models load
const Event = require("./models/eventModel.js");
const User = require("./models/userModel.js");

//Routes load
const indexRoutes = require("./routes/indexRoute");
const eventsRoutes = require("./routes/eventsRoute");
const usersRoutes = require("./routes/usersRoute");
const economicsRoutes = require("./routes/economicsRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Expose-Origin", "*");
  res.setHeader("Access-Control-Expose-Headers", "*");
  res.setHeader("Access-Control-Expose-Methods", "*");
  res.setHeader("Access-Control-Expose-Credentials", true);
  next();
});

app.use("/", indexRoutes);
app.use("/events", eventsRoutes);
app.use("/users", usersRoutes);
app.use("/economics", economicsRoutes);

module.exports = app;
