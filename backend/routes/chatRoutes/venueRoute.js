const express = require("express");
const router = express.Router();
const VenueModel = require("../../models/chatConvoModel/venueModel");

// POST request to create a new VenueModel entry
router.post("/venue_location", async (req, res) => {
  try {
    const { authId, order, venue, location } = req.body;
    const newVenueModel = new VenueModel({ authId, order, venue, location });

    await newVenueModel.save();
    res.status(201).json(newVenueModel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create VenueModel entry" });
  }
});

//PUT METHODE:
router.put("/venue_location/:id", async (req, res) => {
  const { id } = req.params;
  const { venue, location } = req.body;

  try {
    const venueNew = await VenueModel.findById(id);
    if (!venueNew) {
      return res.status(404).json({ error: "venue_location entry not found" });
    }

    venueNew.venue = venue;
    venueNew.location = location;

    await venueNew.save();

    res.status(200).json(venueNew);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update venue_location entry" });
  }
});

// GET request to retrieve all VenueModel entries
router.get("/venue_location", async (req, res) => {
  const { authId } = req.query;
  try {
    const details = await VenueModel.find({ authId });
    res.status(200).json({
      message: "get venue_location details successfully",
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
