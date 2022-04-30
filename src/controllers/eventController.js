"use strict";

const errorResponse = require("../services/errorResponse");
const eventService = require("../services/eventService");

exports.get = async (req, res, next) => {
  try {
    eventService.getAllEvents(res);
  } catch (error) {
    errorResponse.error500(res);
  }
};

exports.getByUser = async (req, res, next) => {
  try {
    eventService.getEventByUser(req.params.id, res); //O ID deve ser passado pelo token, via HEADER. Já que o ID expostp
  } catch (error) {                                  //pode gerar alteração de outros eventos que não do usuário esperado
    errorResponse.error500(res);
                      //isso gera insegurança. EXTRAIR ID DO TOKEN
  }
};

exports.getByEventId = async (req, res, next) => {
  try {
    eventService.getEventById(req.params.id, req.headers.userid, res);
 //O ID deve ser passado pelo token, via HEADER. Já que o ID expostp
  } catch (error) {                                  //pode gerar alteração de outros eventos que não do usuário esperado
    errorResponse.error500(res);                     //isso gera insegurança. EXTRAIR ID DO TOKEN
  }
};

exports.getEventLogByUser = async (req, res, next) => {
  try {
    eventService.getEventLogByUser(req.params.id, res); //O ID deve ser passado pelo token, via HEADER. Já que o ID expostp
  } catch (error) {                                  //pode gerar alteração de outros eventos que não do usuário esperado
    errorResponse.error500(res);
                      //isso gera insegurança. EXTRAIR ID DO TOKEN
  }
};

exports.deleteEventLogByUser = async (req, res, next) => {
  try {
    eventService.deleteEventLogByUser(req.params.id, res); //O ID deve ser passado pelo token, via HEADER. Já que o ID expostp
  } catch (error) {                                  //pode gerar alteração de outros eventos que não do usuário esperado
    errorResponse.error500(res);
                      //isso gera insegurança. EXTRAIR ID DO TOKEN
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
