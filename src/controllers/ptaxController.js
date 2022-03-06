"use strict";

const errorResponse = require("../services/errorResponse");
const economicsService = require("../services/economicsServices");

exports.get = async (req, res, next) => {
  try {
    economicsService.getPtax(req.query.initialDate, req.query.finalDate, res);
  } catch (error) {
    errorResponse.error500(res);
  }
};
