"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const controller = require("../controllers/eventController.js");
const authService = require("../services/authService");

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


router.get("/", controller.get);
router.get("/:id", authService.authorize, controller.getById);
router.post("/", authService.authorize, controller.post);
router.put("/:id", authService.authorize, controller.put);
router.delete("/:id", controller.delete);

module.exports = router;
