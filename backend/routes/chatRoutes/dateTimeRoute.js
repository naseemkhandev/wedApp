const express = require("express");
const router = express.Router();
const DateTime = require("../../models/chatConvoModel/dateTimeModel");

// POST request to create a new DateTime entry
router.post("/datetimes", async (req, res) => {
  try {
    const { authId, order, date, time } = req.body;
    const newDateTime = new DateTime({ authId, order, date, time });

    await newDateTime.save();
    res.status(201).json(newDateTime);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create DateTime entry" });
  }
});

router.put("/datetimes/:id", async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;

  try {
    const dateTime = await DateTime.findById(id);
    if (!dateTime) {
      return res.status(404).json({ error: "DateTime entry not found" });
    }

    dateTime.date = date;
    dateTime.time = time;

    await dateTime.save();

    res.status(200).json(dateTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update DateTime entry" });
  }
});

// GET request to retrieve all DateTime entries
router.get("/datetimes", async (req, res) => {
  const { authId } = req.query;
  try {
    const details = await DateTime.find({ authId });
    res.status(200).json({
      message: "get DateTime details successfully",
      details,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving details",
      error,
    });
  }
});
module.exports = router;
