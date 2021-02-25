'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const indexRoutes = require('./routes/indexRoute')
const eventsRoutes = require('./routes/eventsRoute')

app.use('/', indexRoutes);
app.use('/events', eventsRoutes);

module.exports = app;


module.exports = app;