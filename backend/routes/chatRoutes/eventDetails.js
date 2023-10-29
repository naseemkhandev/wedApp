const express = require("express");
const {
  eventDetailsController,
  getEventController,
} = require("../../controller/eventDetailsController");

const router = express.Router();

//routers:
//POST || EVENT DETAILS:
router.post("/", eventDetailsController);

//GET || EVENT DETAILS:
router.get("/", getEventController);

module.exports = router;
