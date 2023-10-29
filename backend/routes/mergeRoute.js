const express = require("express");
const {
  getMergedDetailsController,
} = require("../controller/mergeDetailsController");

const router = express.Router();

// GET || MERGED DETAILS:
router.get("/", getMergedDetailsController);

module.exports = router;
