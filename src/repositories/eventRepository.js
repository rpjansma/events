'use strict'

const mongoose = require('mongoose')
const Event = mongoose.model('Event')

exports.get = async () => {
  const res = await Event.find({});
  return res;
}

exports.getById = async (id) => {
  const res = await Event.findById(id);
  return res;
}

exports.create = async (data) => {
  let event = new Event(data);
  await event.save();
}

exports.update = async (id, data) => {
  await Event
    .findByIdAndUpdate(id, {
      $set: {
        title: data.title,
        start: data.start,
        end: data.end,
      }
    })
}

exports.delete = async (id) => {
  await Event
    .findByIdAndRemove(id);
}