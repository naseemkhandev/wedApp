const express = require("express");
const router = express.Router();
const ChatTitle = require("../../models/chatConvoModel/chatTitle");

router.post("/chattitle", async (req, res) => {
  try {
    const { authId, chatTitle, id } = req.body;

    const savedPost = await ChatTitle.create({
      authId,
      chatTitle,
      id,
    });

    res.status(200).json({
      message: "Added successfully",
      savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// GET request to retrieve chat titles by authId and _id
router.get("/chattitle", async (req, res) => {
  try {
    const { authId } = req.query;

    const chatTitle = await ChatTitle.find({
      authId,
    });

    if (!chatTitle) {
      return res.status(404).json({ message: "Chat title not found" });
    }

    res.status(200).json({
      message: "Chat title retrieved successfully",
      chatTitle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
