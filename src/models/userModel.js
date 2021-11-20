'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },

  fullname: {
    type: String,
    required: false,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
    required: true
  },

  birthdate: {
    type: Date,
    required: false
  },

  roles: [{
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
  }]
});

module.exports = mongoose.model('User', schema)