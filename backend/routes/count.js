const express = require("express");
const collectionModel = require("../models/collectionModel");
const videoCollectionModel = require("../models/videoCollectionModel");
const Poll = require("../models/pollsModel");
const GiftRegistry = require("../models/giftModel");
const addUser = require("../models/addUserModel");
const MusicPlaylist = require("../models/musicListModel");

const router = express.Router();

router.get("/statistics/:loginId/count", async (req, res) => {
  try {
    const {loginId} = req.params;
    const { authId } = req.query;

    const photoCountPromise = collectionModel.aggregate([
      { $match: { authId } },
      { $group: { _id: null, total: { $sum: { $size: "$photos" } } } },
    ]);

    const videoCountPromise = videoCollectionModel.aggregate([
      { $match: { authId } },
      { $group: { _id: null, total: { $sum: { $size: "$videos" } } }},
    ]);

    const pollCountPromise = Poll.countDocuments({ authId });

    const giftCountPromise = GiftRegistry.countDocuments({ authId });

    // Count the addUser documents based on a case-insensitive search
    const userCountPromise = addUser.countDocuments({ loginId });

    const musicPlaylistCountPromise = MusicPlaylist.countDocuments({ authId });

    const [
      photoCountResult,
      videoCountResult,
      pollCount,
      giftCount,
      userCount,
      musicPlaylistCount,
    ] = await Promise.all([
      photoCountPromise,
      videoCountPromise,
      pollCountPromise,
      giftCountPromise,
      userCountPromise,
      musicPlaylistCountPromise,
    ]);

    const results = [
      {
        name: "photoCount",
        value: photoCountResult.length > 0 ? photoCountResult[0].total : 0,
      },
      {
        name: "videoCount",
        value: videoCountResult.length > 0 ? videoCountResult[0].total : 0,
      },
      { name: "pollCount", value: pollCount },
      { name: "giftCount", value: giftCount },
      { name: "userCount", value: userCount },
      { name: "musicPlaylistCount", value: musicPlaylistCount },
    ];

    res.status(200).json(results);
  } catch (error) {
    console.error("Error retrieving statistics:", error);
    res.status(500).json({
      message: "Error retrieving statistics",
      error: error.message,
    });
  }
});

module.exports = router;
