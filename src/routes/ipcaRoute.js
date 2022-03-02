'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/ipcaController.js')

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

router.get('/', controller.get);

module.exports = router;