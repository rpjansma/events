'use strict';

const ValidationContract = require('../validation/contractValidators.js')
const repository = require('../repositories/userRepository.js')
const authService = require('../services/authService');

const md5 = require('md5')


exports.getAllUsers = async (res) => {
  let data = await repository.get()
  return res.status(200).send(data);
};

exports.dataValidation = (data, res) => {
  let contract = new ValidationContract();
  contract.hasMinLen(data.username, 3, 'Name should have a minimum of 3 characters.');
  contract.hasMinLen(data.password, 6, 'Password should have a minimum of 6 characters.');
  contract.isEmail(data.email, 'Invalid e-mail.');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }
};

exports.createUser = async (data, res) => {
  await repository.create({
    username: data.username,
    email: data.email,
    password: md5(data.password + global.SALT_KEY),
    roles: ["user"]
  });

  res.status(201).send({
    message: "User created successfully. :)"
  });
};

exports.authenticateUser = async (data, res) => {
  const user = await repository.authenticate({
    username: data.username,
    password: md5(data.password + global.SALT_KEY),
  });

  if (!user) {
    res.status(401).send({
      message: 'Invalid user or password.'
    });
    return;
  }

  const token = await authService.generateToken({
    id: user._id,
    email: user.email,
    username: user.username
  })

  res.setHeader('x-access-token', token); 

  res.status(201).send({
    token: token,
    data: {
      email: user.email,
      username: user.username,
      role: user.roles
    }
  });
}

exports.refreshUserToken = async (data, token, res) => {
  const dataToken = await authService.decodeToken(token);

  const user = await repository.getById(dataToken.id);

  if (!user) {
    res.status(401).send({
      message: 'Invalid user or password.'
    });
    return;
  }

  const tokenData = await authService.generateToken({
    id: user._id,
    email: user.email,
    username: user.username
  })

  res.status(201).send({
    token: token,
    data: {
      email: user.email,
      username: user.username
    }
  });
}

exports.deleteUser = async (data, res) => {
  await repository.delete(data.id);
  res.status(200).send({
    message: 'User removed successfully.'
  });
};