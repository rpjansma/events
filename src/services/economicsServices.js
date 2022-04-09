"use strict";

const axios = require("axios");

const moment = require("moment");

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

exports.getPib = async (initialDate, finalDate, res) => {
  let pibData = [];

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
        pibData.push(info);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return res.status(200).send(pibData);
};

exports.getIbovespa = async (initialDate, finalDate, res) => {
  let ibovespaData = [];

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
        ibovespaData.push(info);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return res.status(200).send(ibovespaData);
};

exports.getCdi = async (initialDate, finalDate, res) => {
  let cdiData = [];

  await axios
    .get(
      "https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados?formato=json&dataInicial=" +
        initialDate +
        "&dataFinal=" +
        finalDate
    )
    .then((res) => {
      let info;
      for (info of res.data) {
        cdiData.push(info);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return res.status(200).send(cdiData);
};

exports.getPtax = async (initialDate, finalDate, res) => {
  let ptaxData = [];


  await axios
    .get(
      "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial='" +
        convertDateWithSlash(initialDate) +
        "',dataFinalCotacao='" +
        convertDateWithSlash(finalDate) +
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

function convertDateWithSlash(dateStr) {
  const [day, month, year] = dateStr.split("/")
  return  month + "-" + day + "-" + year
}