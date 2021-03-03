'use strict';

const ValidationContract = require('../validation/contractValidators.js')
const repository = require('../repositories/userRepository.js')

const emailService = require('./emailService')

exports.getAllUsers = async () => {
  let data = await repository.get()
  return res.status(200).send(data);
}