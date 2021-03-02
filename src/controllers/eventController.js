'use strict';

const ValidationContract = require('../validation/contractValidators.js')
const repository = require('../repositories/eventRepository.js')


exports.get = async (req, res, next) => {
  try {
    let data = await repository.get()
    res.status(200).send(data);

  } catch (error) {
    sendError500();
  }

}

exports.getById = async (req, res, next) => {
  try {
    let data = await repository.getById(req.params.id)
    res.status(200).send(data);
  } catch (error) {
    sendError500();
  }
}

exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.title, 2, 'Title should have a minimum of 2 characters.');
  contract.hasMinLen(req.body.description, 10, 'Description must have a text of 10 characters at least.');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create(req.body)
    res.status(201).send({ message: "Event create successfully. :)" })
  } catch (error) {
    sendError500();
  }
}

exports.put = async (req, res, next) => {
  let contract = new ValidationContract();
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
    sendError500();
  }
}

exports.delete = async (req, res, next) => {
  try {
    await repository.delete()
    res.status(200).send({
      message: 'Event removed successfully.'
    });
  } catch (error) {
    sendError500();
  }
};

function sendError500() {
  res.status(500).send({
    message: 'We have a failure while trying to make your requisition happen. Sorry, try again!'
  });
}