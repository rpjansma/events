'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  consultationDate: {
    type: Date,
    required: true,
    default: Date.now
  }

});

module.exports = mongoose.model('EventLog', schema)