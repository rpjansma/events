"use strict";

const axios = require("axios");

exports.getIpca = async (res) => {
  let data = []
  await axios
    .get("https://api.bcb.gov.br/dados/serie/bcdata.sgs.433//dados?formato=json&dataInicial=11/01/2021&dataFinal=21/11/2021")
    .then((res) => {
      let info
      for(info of res.data) {
        data.push(info)
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return res.status(200).send(data);
};
