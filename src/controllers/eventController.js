'use strict';

const ValidationContract = require('../validation/contractValidators.js')
const repository = require('../repositories/eventRepository.js')
const authService = require('../services/authService')


exports.get = async (req, res, next) => {
  try {
    let data = await repository.get()
    res.status(200).send(data);

  } catch (error) {
    res.status(500).send({
      message: 'We have a failure while trying to make your requisition happen. Sorry, try again!'
    });
  }

}

exports.getById = async (req, res, next) => {
  try {
    let data = await repository.getById(req.params.id)
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: 'We have a failure while trying to make your requisition happen. Sorry, try again!'
    });
  }
}

exports.post = async (req, res, next) => {
  const contract = new ValidationContract();
  contract.hasMinLen(req.body.title, 2, 'Title should have a minimum of 2 characters.');
  contract.hasMinLen(req.body.description, 10, 'Description must have a text of 10 characters at least.');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    const data = await authService.decodeToken(token);

    await repository.create(req.body);
    res.status(201).send({ message: "Event created successfully. :)" })
  } catch (error) {
    res.status(500).send({
      message: 'We have a failure while trying to make your requisition happen. Sorry, try again!',
      error: error
    });
  }
}

exports.put = async (req, res, next) => {
  const contract = new ValidationContract();
  contract.hasMinLen(req.body.title, 2, 'Title should have a minimum of 2 characters.');
  contract.hasMinLen(req.body.description, 10, 'Description must have a text of 10 characters at least.');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.update(req.params.id, req.body)
    res.status(200).send({
      message: 'Event updated successfully. :)'
    })
  } catch (e) {
    res.status(500).send({
      message: 'We have a failure while trying to make your requisition happen. Sorry, try again!'
    });
  }
}

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body.id);
    res.status(200).send({
      message: 'Event removed successfully.'
    });
  } catch (error) {
    res.status(500).send({
      message: 'We have a failure while trying to make your requisition happen. Sorry, try again!'
    });
  }
};

