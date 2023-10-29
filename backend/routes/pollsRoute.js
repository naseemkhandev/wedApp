// router object:
const express = require("express");
const Poll = require("../models/pollsModel");

const router = express.Router();

// POST: Create a new poll
router.post("/polls", async (req, res) => {
  const { authId, question, options } = req.body;

  try {
    if (!options || !Array.isArray(options)) {
      return res.status(400).json({ error: "Options array is required." });
    }

    const poll = new Poll({
      authId,
      question,
      options: options.map((option) => ({ text: option, count: 0 })),
    });

    await poll.save();

    res.json(poll);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the poll." });
  }
});

// VOTE
router.put("/polls/:optionId/vote", async (req, res) => {
  try {
    const { optionId } = req.params;
    const { browserId } = req.body;

    // Find the collection document that contains the photo with the given photoId
    const collection = await Poll.findOne({ "options._id": optionId });

    if (!collection) {
      return res.status(404).json({
        message: "optionId not found in any collection.",
      });
    }

    // Find the photo in the photos array using the provided photoId
    const poll = collection.options.find(
      (poll) => poll._id.toString() === optionId
    );

    if (!poll) {
      return res.status(404).json({
        message: "poll not found.",
      });
    }

    // Check if the user has already liked the photo
    if (poll.voteBy.includes(browserId)) {
      return res.status(409).json({
        message: "User has already liked this photo.",
      });
    }

    // Update likeCount and likedBy array
    poll.voteCount += 1;
    poll.voteBy.push(browserId);

    // Save the changes to the collection document
    await collection.save();

    res.status(200).json({
      message: "Photo liked successfully.",
      votedPoll: poll,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while liking the photo.",
      error,
    });
  }
});

// GET: Get a specific poll by authID:
router.get("/get-polls", async (req, res) => {
  const { authId } = req.query;

  try {
    const poll = await Poll.find({ authId });

    if (!poll) {
      return res.status(404).json({ error: "Poll not found." });
    }

    res.json(poll);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the poll." });
  }
});

// GET: Get all polls
router.get("/getallpolls", async (req, res) => {
  try {
    const polls = await Poll.find();

    res.json(polls);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the polls." });
  }
});

//BY POLL ID
router.get("/get-polls/:id", async (req, res) => {
  try {
    const details = await Poll.findById(req.params.id);
    res.status(200).json({
      message: "Get poll by id successfully",
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
