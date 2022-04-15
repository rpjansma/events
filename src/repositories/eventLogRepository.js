'use strict'

const mongoose = require('mongoose')
const Event = mongoose.model('EventLog')

exports.get = async () => {
  const res = await Event.find({}).populate('user');
  return res;
}

exports.createEventLog = async (data) => {
  let event = new Event();
  await event.save();
}