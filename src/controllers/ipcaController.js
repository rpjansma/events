"use strict";

const errorResponse = require("../services/errorResponse");
const ipcaService = require("../services/ipcaService");

exports.get = async (req, res, next) => {
  try {
    ipcaService.getIpca(res);
  } catch (error) {
    errorResponse.error500(res);
  }
};
