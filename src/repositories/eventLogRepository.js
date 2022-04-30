'use strict'

const mongoose = require('mongoose')
const Event = mongoose.model('EventLog')

exports.get = async () => {
  const res = await Event.find({}).populate('user');
  return res;
}

exports.createEventLog = async (eventId, userId) => {
  let event = new Event({event:eventId, user: userId});
  await event.save();
}

exports.getEventLogByUser = async (userId) => {
  const res = await Event.find({user: userId}).populate("event");
  return res;
}

exports.deleteEventLogByUser = async (eventLogId) => {
  await Event.findByIdAndRemove(eventLogId);
}