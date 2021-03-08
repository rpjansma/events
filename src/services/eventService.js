'use strict';

const ValidationContract = require('../validation/contractValidators.js');
const repository = require('../repositories/eventRepository.js');
const authService = require('../services/authService');

exports.getAllEvents = async (res) => {
  let data = await repository.get();
  return res.status(200).send(data);
};

exports.getEventById = async (data, res) => {
  let payload = await repository.getById(data);
  res.status(200).send(payload);
};

exports.createEvent = async (data, token, res) => {

  const dataToken = await authService.decodeToken(token);

  await repository.create(data);
  res.status(201).send({ message: "Event created successfully. :)" });
};

exports.updateEvent = async (id, data, token, res) => {

  const dataToken = await authService.decodeToken(token);

  await repository.update(id, data)
  res.status(200).send({
    message: 'Event updated successfully. :)'
  })
};

exports.deleteEventById = async (id, res) => {
  if (!id) {
    res.status(400).send({
      message: 'Please inform the event Id you want to delete.'
    });
  }

  await repository.delete(id);
  res.status(200).send({
    message: 'Event removed successfully.'
  });
};

exports.validateEventData = (data, res) => {
  const contract = new ValidationContract();
  contract.hasMinLen(data.title, 2, 'Title should have a minimum of 2 characters.');
  contract.hasMinLen(data.description, 10, 'Description must have a text of 10 characters at least.');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }
};

