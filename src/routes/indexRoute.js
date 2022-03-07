'use strict';

const express = require('express');
const router = express.Router();

//Test route
const route = router.get('/', (req, res, next) => {
  res.status(200).send({
    title: "Events API",
    version: "2.0.0"
  });
});

module.exports = router;
