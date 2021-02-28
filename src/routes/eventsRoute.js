'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/eventController.js')

const app = express();
const router = express.Router();

//Data body treatment
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//CRUD actions delegated to Controller
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;