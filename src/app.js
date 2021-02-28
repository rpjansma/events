'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb+srv://db_user:dbpassword@calendar.xrt8t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

//Models load
const Event = require('./models/events.js')

//Routes load
const indexRoutes = require('./routes/indexRoute')
const eventsRoutes = require('./routes/eventsRoute')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRoutes);
app.use('/events', eventsRoutes);

module.exports = app;