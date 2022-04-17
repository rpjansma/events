"use strict";

const ValidationContract = require("../validation/contractValidators.js");
const eventRepository = require("../repositories/eventRepository.js");
const eventLogRepository = require("../repositories/eventLogRepository.js");

exports.getAllEvents = async (res) => {
  let data = await eventRepository.get();
  return res.status(200).send(data);
};

exports.getEventByUser = async (data, res) => {
  let payload = await eventRepository.getByUser(data);
  res.status(200).send(payload);
};

exports.getEventLogByUser = async (data, res) => {
  let payload = await eventLogRepository.getEventLogByUser(data);
  res.status(200).send(payload);
};

exports.getEventById = async (eventId, userId, res) => {
  await eventLogRepository.createEventLog(eventId, userId);
  let payload = await eventRepository.getByEventId(eventId, res);
  res.status(200).send(payload);
};

exports.createEvent = async (data, res) => {
  await eventRepository.create(data);
  res.status(201).send({ message: "Event created successfully. :)" });
};

exports.updateEvent = async (id, data, res) => {
  await eventRepository.update(id, data);
  res.status(200).send({
    message: "Event updated successfully. :)",
  });
};

exports.deleteEventById = async (id, res) => {
  if (!id) {
    res.status(400).send({
      message: "Please inform the event Id you want to delete.",
    });
  }

  await eventRepository.delete(id);
  res.status(200).send({
    message: "Event removed successfully.",
  });
};

exports.validateEventData = (data, res) => {
  const contract = new ValidationContract();
  contract.hasMinLen(
    data.title,
    2,
    "Title should have a minimum of 2 characters."
  );

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }
};
