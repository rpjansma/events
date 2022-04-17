"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: false,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  consultationDate: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

module.exports = mongoose.model("EventLog", schema);
