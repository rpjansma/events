'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  // user: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    // required: true
  // },

  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true,
  },

  start: {
    type: Date,
    required: true
  },

  end: {
    type: Date,
    required: true
  },

});

module.exports = mongoose.model('Event', schema)