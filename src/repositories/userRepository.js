'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.get = async () => {
  const res = await User.find({});
  return res;
}

exports.create = async (data) => {
  let user = new User(data);
  await user.save();
}

exports.delete = async (id) => {
  await User.findOneAndDelete(id);
}