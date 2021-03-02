'use strict';

const ValidationContract = require('../validation/contractValidators.js')
const repository = require('../repositories/userRepository.js')


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
    await repository.create(req.body);
    res.status(201).send({
      message: "User created successfully. :)"
    });
  } catch (error) {
    res.status(500).send({
      message: 'We had a failure while trying to make your requisition happen. Sorry, try again!'
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