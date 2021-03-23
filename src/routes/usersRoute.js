'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/userController.js')

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

router.get('/', controller.get);
router.post('/', controller.post);
router.post('/authenticate', controller.authenticate)
router.post('/refresh-token', controller.refreshToken)
router.delete('/', controller.delete);

module.exports = router;