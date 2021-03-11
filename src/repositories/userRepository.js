'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.get = async () => {
  const res = await User.find({});
  return res;
}

exports.getById = async (id) => {
  const res = await User.findById(id);
  return res;
}


exports.authenticate = async (data) => {
  const res = await User.findOne({
    username: data.username,
    password: data.password
  });
  return res;
}

exports.create = async (data) => {
  let user = new User(data);
  await user.save();
}

exports.delete = async (id) => {
  await User
    .findOneAndRemove(id);
}