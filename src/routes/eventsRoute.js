"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const controller = require("../controllers/eventController.js");
const authService = require("../services/authService");

const app = express();
const router = express.Router();

//Data body treatment
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS configuration
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//CRUD actions delegated to Controller
router.get("/", controller.get);
router.get("/:id", authService.authorize, controller.getById);
router.post("/", authService.authorize, controller.post);
router.put("/:id", authService.authorize, controller.put);
router.delete("/:id", controller.delete);

module.exports = router;
