const express = require("express");
const BrowserIdModel = require("../models/browserIdModel");

const router = express.Router();

// POST request handler
router.post("/browser-ids", async (req, res) => {
  const { browserId, authId } = req.body;

  try {
    const browserUID = new BrowserIdModel({
      browserId,
      authId,
    });

    await browserUID.save();

    res.json(browserUID);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the browserUID." });
  }
});

// GET request handler
router.get("/browser-ids", async (req, res) => {
  const { authId } = req.query;

  try {
    const browserIds = await BrowserIdModel.find({ authId });
    res.status(200).json(browserIds);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving browser IDs");
  }
});

module.exports = router;
