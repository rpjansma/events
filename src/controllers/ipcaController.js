"use strict";

const errorResponse = require("../services/errorResponse");
const ipcaService = require("../services/ipcaService");

exports.get = async (req, res, next) => {
  try {

    ipcaService.getIpca(req.query.initialDate, req.query.finalDate, res);
  } catch (error) {
    errorResponse.error500(res);
  }
};
