const express = require("express");
const router = express.Router();
const PlaylistItem = require("../models/suggestSongs");

router.post("/suggest_playlist", async (req, res) => {
  try {
    const playlistData = req.body;
    const playlist = await PlaylistItem.create(playlistData);
    res.status(201).json(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to retrieve playlist items by authId
router.get("/suggest_playlist", async (req, res) => {
  const { authId } = req.query;
  try {
    if (!authId) {
      return res.status(400).json({
        success: false,
        message: "Missing authId",
      });
    }

    // Find playlist items by authId
    const playlistItems = await PlaylistItem.find({ authId });

    res.status(200).json({ success: true, data: playlistItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving playlist items",
    });
  }
});

router.get("/suggest_playlist/:id", async (req, res) => {
  try {
    const details = await PlaylistItem.findById(req.params.id);
    res.status(200).json({
      message: "Get audio by id successfully",
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

// POST METHOD - Add More Songs to Playlist
router.post("/add-more-songs/:playlistId", async (req, res) => {
  try {
    const { playlistId } = req.params;
    const songs = req.body.songs;

    let songsArr = [];
    if (Array.isArray(songs)) {
      songsArr = songs.map((song) => ({
        name: song.name,
        externalUrl: song.externalUrl,
      }));
    } else {
      songsArr.push({
        name: songs.name,
        externalUrl: songs.externalUrl,
      });
    }

    const updatedPlaylist = await PlaylistItem.findByIdAndUpdate(
      playlistId,
      { $push: { songs: { $each: songsArr } } },
      { new: true }
    );

    res.status(200).json({
      message: "Added additional songs to playlist successfully",
      updatedPlaylist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding additional songs to playlist",
      error,
    });
  }
});

module.exports = router;
