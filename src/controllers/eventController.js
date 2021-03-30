"use strict";

const ValidationContract = require("../validation/contractValidators.js");
const repository = require("../repositories/eventRepository.js");
const errorResponse = require("../services/errorResponse");
const eventService = require("../services/eventService");
const authService = require("../services/authService");

exports.get = async (req, res, next) => {
  try {
    eventService.getAllEvents(res);
  } catch (error) {
    errorResponse.error500(res);
  }
};

exports.getByUser = async (req, res, next) => {
  try {
    eventService.getEventByUser(req.params.id, res);
  } catch (error) {
    errorResponse.error500(res);
  }
};

exports.post = async (req, res, next) => {
  eventService.validateEventData(req.body, res);

  try {
    eventService.createEvent(req.body, res);
  } catch (error) {
    errorResponse.error500(res);
  }
};

exports.put = async (req, res, next) => {
  eventService.validateEventData(req.body, res);

  try {
    eventService.updateEvent(req.params.id, req.body, res);
  } catch (error) {
    errorResponse.error500(res);
  }
};

exports.delete = async (req, res, next) => {
  try {
    eventService.deleteEventById(req.params.id, res);
  } catch (error) {
    errorResponse.error500(res);
  }
};
