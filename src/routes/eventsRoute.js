'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/eventController.js')

const app = express();
const router = express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

router.post('/', controller.post);

router.put('/:id', controller.put);

router.delete('/', controller.delete);

module.exports = router;