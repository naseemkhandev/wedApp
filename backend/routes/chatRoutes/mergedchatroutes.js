const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Import your models
const WelcomeDetails = require("../../models/chatConvoModel/welcomeModel");
const Venue = require("../../models/chatConvoModel/venueModel");
const DateTime = require("../../models/chatConvoModel/dateTimeModel");
const PhotosVideos = require("../../models/chatConvoModel/photosVideos");

router.get("/mergedchatroutes", async (req, res) => {
  const { authId } = req.query;

  try {
    const welcomeDetails = await WelcomeDetails.find({ authId });
    const venue = await Venue.find({ authId });
    const dateTime = await DateTime.find({ authId });
    const photosVideos = await PhotosVideos.find({ authId });

    const mergedData = [
      { welcomeDetails },
      { venue },
      { dateTime },
      { photosVideos },
    ];

    res.status(200).json({
      message: "Merged data retrieved successfully",
      mergedData,
    });
  } catch (error) {
    console.error("Error retrieving merged data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
