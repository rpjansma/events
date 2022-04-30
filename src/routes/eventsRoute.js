"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const controller = require("../controllers/eventController.js");
const authService = require("../services/authService");

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


router.get("/", authService.authorize, controller.get);
router.get("/user/:id", authService.authorize, controller.getByUser);
router.get("/event/:id", authService.authorize, controller.getByEventId);
router.get("/event/user/:id", authService.authorize, controller.getEventLogByUser);
router.delete("/event/user/:id", authService.authorize, controller.deleteEventLogByUser);
router.post("/", authService.authorize, controller.post);
router.put("/:id", authService.authorize, controller.put);
router.delete("/:id", authService.authorize, controller.delete);

module.exports = router;