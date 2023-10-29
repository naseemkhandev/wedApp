// router object:
const express = require("express");
const musicListModel = require("../models/musicListModel");

const router = express.Router();

// POST: Create a new playlist
router.post("/playlists", async (req, res) => {
  const { authId, inviteType, playListName, playListUrl } = req.body;

  try {
    const playlist = new musicListModel({
      authId,
      inviteType,
      playListName,
      playListUrl,
    });

    await playlist.save();

    res.json(playlist);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the playlist." });
  }
});





// GET: Get a specific playlists by ID:
router.get("/get-playlists", async (req, res) => {
  const { authId } = req.query;

  try {
    const poll = await musicListModel.find({authId});

    if (!poll) {
      return res.status(404).json({ error: "playlists not found." });
    }

    res.json(poll);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the playlists." });
  }
});




// // GET: Get all polls
// router.get("/getallpolls", async (req, res) => {
//   try {
//     const polls = await musicListModel.find();

//     res.json(polls);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the polls." });
//   }
// });

module.exports = router;
