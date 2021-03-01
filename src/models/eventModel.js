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
    required: true
  },

  finalDate: {
    type: Date,
    required: true
  },

  creationDate: {
    type: Date,
    required: true,
    default: Date.now
  },

  description: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Event', schema)