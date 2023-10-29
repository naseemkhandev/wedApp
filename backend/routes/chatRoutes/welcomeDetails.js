const express = require("express");
const {
  addDetailsController,
  getDetailsController,
  updateDetailsController,
} = require("../../controller/welcomeDetailsController");

const router = express.Router();

//routers:
//POST || WELCOME DETAILS:
router.post("/welcomemessages", addDetailsController);

//PUT || WELCOME DETAILS:
router.put("/welcomemessages/:id", updateDetailsController);

//GET || WELCOME DETAILS:
router.get("/welcomemessages", getDetailsController);

module.exports = router;
