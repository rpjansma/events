'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  initialDate: {
    type: Date,
    default: Date.now //todo: correct later
  },

  finalDate: {
    type: Date,
    default: Date.now //todo: correct later
  },
  creationDate: {
    type: Date,
    default: Date.now //todo: correct later
  },

  description: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Event', schema)