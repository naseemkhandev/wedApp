const express = require("express");
const router = express();
const Weddingss = require("../Test/testModel");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/weddingsx", async (req, res) => {
  try {
    const { order, authId, chatId, messages } = req.body;

    const photos = req.files;
    let photosArr = [];
    if (req.files && req.files.length > 0) {
      for (const photo of photos) {
        const result = await cloudinary.uploader.upload(photo.path, {
          folder: "Collections",
          public_id: `photo_${Date.now()}`,
        });

        photosArr.push({
          public_id: result.public_id,
          url: result.secure_url,
          size: result.bytes,
          name: photo.originalname,
        });
      }
    }

    const savedPost = await Weddingss.create({
      order,
      authId,
      chatId,
      messages,
      photos: photosArr,
    });

    res
      .status(201)
      .json({ message: "Wedding created successfully", savedPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create wedding", error: error.message });
  }
});

// GET request to retrieve all entries
router.get("/weddingsx", async (req, res) => {
  const { authId } = req.query;
  try {
    const details = await Weddingss.find({ authId });
    res.status(200).json({
      message: "Retrieved data successfully",
      details,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving data details",
      error,
    });
  }
});

module.exports = router;
