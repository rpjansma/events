'use strict';

const repository = require('../repositories/userRepository');
const userService = require('../services/userService');
const authService = require('../services/authService');
const errorResponse = require('../services/errorResponse');
const md5 = require('md5');

const emailService = require('../services/emailService');


exports.get = async (req, res, next) => {
  try {
    let data = await repository.get()
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: 'We had a failure while trying to make your requisition happen. Sorry, try again!'
    });
  }

}

exports.post = async (req, res, next) => {
  const data = req.body;

  userService.dataValidation(data, res);

  try {
    userService.createUser(data, res);

    //emailService.send(
    //  req.body.email,
    //  'Calendar API',
    //  global.EMAIL_TMPL.replace('{0}', req.body.name));

  } catch (error) {
    errorResponse.error500(res);
  }
}

exports.authenticate = async (req, res, next) => {
  try {
    const user = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
    });

    if (!user) {
      res.status(404).send({
        message: 'Invalid user or password.'
      });
      return;
    }

    const token = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name
    })

    res.status(201).send({
      token: token,
      data: {
        email: user.email,
        name: user.name,
        role: user.roles
      }
    });
  } catch (error) {
    res.status(500).send({
      message: 'We had a failure while trying to make your requisition happen. Sorry, try again, please!'
    });
  }
}

exports.refreshToken = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const user = await repository.getById(data.id);

    if (!user) {
      res.status(404).send({
        message: 'Invalid user or password.'
      });
      return;
    }

    const tokenData = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name
    })

    res.status(201).send({
      token: token,
      data: {
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).send({
      message: 'We had a failure while trying to make your requisition happen. Sorry, try again, please!'
    });
  }
}

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body.id)
    res.status(200).send({
      message: 'User removed successfully.'
    });
  } catch (error) {
    res.status(500).send({
      message: 'We had a failure while trying to make your requisition happen. Sorry, try again!'
    });
  }
};

function sendError500() {
  res.status(500).send({
    message: 'We had a failure while trying to make your requisition happen. Sorry, try again!'
  });
}