'use strict';

const ValidationContract = require('../validation/contractValidators')
const repository = require('../repositories/userRepository')
const userService = require('../services/userService')
const authService = require('../services/authService')
const md5 = require('md5')

const emailService = require('../services/emailService')


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
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.name, 3, 'Name should have a minimum of 3 characters.');
  contract.hasMinLen(req.body.password, 6, 'Password should have a minimum of 6 characters.');
  contract.isEmail(req.body.email, 'Invalid e-mail.');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });

    emailService.send(req.body.email, 'Calendar API', global.EMAIL_TMPL.replace('{0}', req.body.name));

    res.status(201).send({
      message: "User created successfully. :)"
    });
  } catch (error) {
    res.status(500).send({
      message: 'We had a failure while trying to make your requisition happen. Sorry, try again!',
      error: error
    });
  }
}

exports.authenticate = async (req, res, next) => {
  try {
    const user = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password)
    });

    if (!customer) {
      res.status(404).send({
        message: 'Invalid user or password.'
      });
      return;
    }

    const token = await authService.generateToken({
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
    await repository.delete()
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