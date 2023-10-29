// router object:
const express = require("express");
const giftModel = require("../models/giftModel");

const router = express.Router();

// POST: Create a new giftlists
router.post("/giftlists", async (req, res) => {
  const { authId, inviteType, userName, giftName, receivedGift } = req.body;

  try {
    const giftlists = new giftModel({
      authId,
      inviteType,
      userName,
      giftName,
      receivedGift,
    });

    await giftlists.save();

    res.json(giftlists);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the giftlists." });
  }
});

// GET: Get a specific giftlists by ID:
router.get("/get-giftlists", async (req, res) => {
  const { authId } = req.query;

  try {
    const gift = await giftModel.find({ authId });

    if (!gift) {
      return res.status(404).json({ error: "giftlists not found." });
    }

    res.json(gift);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the giftlists." });
  }
});

// PUT: Update receivedGift for a specific giftlist by ID:
router.put("/giftlists/:id/gift", async (req, res) => {
  const { id } = req.params;
  const { receivedGift } = req.body;

  try {
    const gift = await giftModel.findById(id);

    if (!gift) {
      return res.status(404).json({ error: "giftlist not found." });
    }

    gift.receivedGift = receivedGift;
    await gift.save();

    res.json(gift);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the giftlist." });
  }
});

// DELETE: Delete a gift by ID
router.delete("/delete-giftlist/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the gift exists
    const existingGift = await giftModel.findById(id);
    if (!existingGift) {
      return res.status(404).json({ error: "Gift not found." });
    }

    await giftModel.findByIdAndDelete(id);

    res.json({ message: "Gift deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the gift." });
  }
});

module.exports = router;
