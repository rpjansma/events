"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const ipcaController = require("../controllers/ipcaController.js");
const ptaxController = require("../controllers/ptaxController.js");

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get("/ipca", ipcaController.get);
router.get("/ptax", ptaxController.get);

module.exports = router;
