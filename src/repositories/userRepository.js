'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.get = async() => {
  const res = await User.find({}, "title creationDate");
  return res;
}

exports.getById = async(id) => {
  const res = await User.findById(id);
  return res;
}

exports.create = async(data) => {
  let user = new User(data);
  await user.save();
}

exports.update = async(id, data) => {
  await User
    .findByIdAndUpdate(id, {
      $set: {
        name: data.name,
        email: data.email
      }
    })
}

exports.delete = async(id) => {
  await User.findOneAndDelete(id);
}