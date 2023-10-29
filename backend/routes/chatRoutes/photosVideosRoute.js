const express = require("express");
const router = express.Router();
const PhotosVideosModel = require("../../models/chatConvoModel/photosVideos");
const cloudinary = require("../../utils/cloudinary");

router.post("/photosandvideos", async (req, res) => {
  try {
    const { authId, order } = req.body;

    // PHOTOS:
    const photos = req.files.photos;
    let photosArr = [];
    if (Array.isArray(photos)) {
      for (const photo of photos) {
        const result = await cloudinary.uploader.upload(photo.tempFilePath, {
          folder: "WeddingEvent",
          public_id: `photo_${Date.now()}`,
        });
        photosArr.push({
          public_id: result.public_id,
          url: result.secure_url,
          size: result.bytes,
          name: photo.name,
        });
      }
    } else {
      const result = await cloudinary.uploader.upload(photos.tempFilePath, {
        folder: "WeddingEvent",
        public_id: `photo_${Date.now()}`,
      });

      photosArr.push({
        public_id: result.public_id,
        url: result.secure_url,
        size: result.bytes,
        name: photos.name,
      });
    }

    // VIDEOS:
    const videos = req.files.videos;

    let videosArr = [];
    if (Array.isArray(videos)) {
      for (const video of videos) {
        const result = await cloudinary.uploader.upload(video.tempFilePath, {
          resource_type: "video",
          folder: "Video_Collections",
          public_id: `video_${Date.now()}`,
        });

        videosArr.push({
          public_id: result.public_id,
          url: result.secure_url,
          size: result.bytes,
          name: video.name,
        });
      }
    } else {
      const result = await cloudinary.uploader.upload(videos.tempFilePath, {
        resource_type: "video",
        folder: "Video_Collections",
        public_id: `photo_${Date.now()}`,
      });

      videosArr.push({
        public_id: result.public_id,
        url: result.secure_url,
        size: result.bytes,
        name: videos.name,
      });
    }

    const savedPost = await PhotosVideosModel.create({
      authId,
      order,
      photos: photosArr,
      videos: videosArr,
    });

    res.status(200).json({
      message: "added photos&videos  successfully",
      savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading photos&videos",
      error,
    });
  }
});

// GET request to retrieve all VenueModel entries
router.get("/photosandvideos", async (req, res) => {
  const { authId } = req.query;
  try {
    const details = await PhotosVideosModel.find({ authId });
    res.status(200).json({
      message: "get photos&videos successfully",
      details,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving photos&videos details",
      error,
    });
  }
});

module.exports = router;
