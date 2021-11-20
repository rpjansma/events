'use strict';

const userService = require('../services/userService');
const errorResponse = require('../services/errorResponse');

const emailService = require('../services/emailService');

exports.get = async (req, res, next) => {
  try {
    userService.getAllUsers(res);
  } catch (error) {
    errorResponse.error500(res);
  }
};

exports.post = async (req, res, next) => {
  userService.dataValidation(req.body, res);

  //emailService.send(
    //  req.body.email,
    //  'Calendar API',
    //  global.EMAIL_TMPL.replace('{0}', req.body.name));

  try {
    userService.createUser(req.body, res);
  } catch (error) {
    errorResponse.error500(res);
  }
}

exports.authenticate = async (req, res, next) => {
  try {
    userService.authenticateUser(req.body, res);
  } catch (error) {
    errorResponse.error500(res);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    userService.refreshUserToken(token, res);
  } catch (error) {
    errorResponse.error500(res);
  }
}

exports.delete = async (req, res, next) => {
  try {
    userService.deleteUser(req.body)
  } catch (error) {
    errorResponse.error500(res);
  }
};