'use strict';

const ValidationContract = require('../validation/contractValidators.js')
const repository = require('../repositories/userRepository.js')
const md5 = require('md5')


exports.getAllUsers = async () => {
  let data = await repository.get()
  return res.status(200).send(data);
};

exports.dataValidation = (data, res) => {
  let contract = new ValidationContract();
  contract.hasMinLen(data.name, 3, 'Name should have a minimum of 3 characters.');
  contract.hasMinLen(data.password, 6, 'Password should have a minimum of 6 characters.');
  contract.isEmail(data.email, 'Invalid e-mail.');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }
};

exports.createUser = async (data, res) => {
  await repository.create({
    name: data.name,
    email: data.email,
    password: md5(data.password + global.SALT_KEY),
    roles:["user"]
  });

  res.status(201).send({
    message: "User created successfully. :)"
  });
};
