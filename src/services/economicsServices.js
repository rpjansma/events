"use strict";

const axios = require("axios");

exports.getIpca = async (initialDate, finalDate, res) => {
  let ipcaData = [];

  await axios
    .get(
      "https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json&dataInicial=" +
        initialDate +
        "&dataFinal=" +
        finalDate
    )
    .then((res) => {
      let info;
      for (info of res.data) {
        ipcaData.push(info);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return res.status(200).send(ipcaData);
};

exports.getPtax = async (initialDate, finalDate, res) => {
  let ptaxData = [];

  await axios
    .get(
      "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial='" +
        initialDate +
        "',dataFinalCotacao='" +
        finalDate +
        "')?$format=json"
    )
    .then((res) => {
      let info;
      for (info of res.data.value) {
        ptaxData.push(info);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return res.status(200).send(ptaxData);
};

exports.getPib = async (initialDate, finalDate, res) => {
  let ipcaData = [];

  await axios
    .get(
      "https://api.bcb.gov.br/dados/serie/bcdata.sgs.14640/dados?formato=json&dataInicial=" +
        initialDate +
        "&dataFinal=" +
        finalDate
    )
    .then((res) => {
      let info;
      for (info of res.data) {
        ipcaData.push(info);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return res.status(200).send(ipcaData);
};
exports.getIbovespa = async (initialDate, finalDate, res) => {
  let ipcaData = [];

  await axios
    .get(
      "https://api.bcb.gov.br/dados/serie/bcdata.sgs.7832/dados?formato=json&dataInicial=" +
        initialDate +
        "&dataFinal=" +
        finalDate
    )
    .then((res) => {
      let info;
      for (info of res.data) {
        ipcaData.push(info);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return res.status(200).send(ipcaData);
};

exports.getCdi = async (initialDate, finalDate, res) => {
  let ipcaData = [];

  await axios
    .get(
      "https://api.bcb.gov.br/dados/serie/bcdata.sgs.4391/dados?formato=json&dataInicial=" +
        initialDate +
        "&dataFinal=" +
        finalDate
    )
    .then((res) => {
      let info;
      for (info of res.data) {
        ipcaData.push(info);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return res.status(200).send(ipcaData);
};