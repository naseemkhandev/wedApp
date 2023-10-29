const collectionModel = require("../models/videoCollectionModel");
const cloudinary = require("../utils/cloudinary");

// POST METHOD
const AddVideoCollectionController = async (req, res) => {
  try {
    const { authId, VideoCollectionName, inviteType } = req.body;
    const videos = req.files.videos;

    let videosArr = [];
    if (Array.isArray(videos)) {
      for (const photo of videos) {
        const result = await cloudinary.uploader.upload(photo.tempFilePath, {
          resource_type: "video",
          folder: "Video_Collections",
          public_id: `video_${Date.now()}`,
        });

        videosArr.push({
          public_id: result.public_id,
          url: result.secure_url,
          size: result.bytes,
          name: photo.name,
        });
      }
    } else {
      const result = await cloudinary.uploader.upload(videos.tempFilePath, {
        resource_type: "video",
        folder: "Video_Collections",
        public_id: `video_${Date.now()}`,
      });

      videosArr.push({
        public_id: result.public_id,
        url: result.secure_url,
        size: result.bytes,
        name: videos.name,
      });
    }

    const savedPost = await collectionModel.create({
      authId,
      VideoCollectionName,
      inviteType,
      videos: videosArr,
    });

    res.status(200).json({
      message: "Added collection details successfully",
      savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading videos",
      error,
    });
  }
};

// PUT METHOD
const LikeVideoController = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { browserId } = req.body;

    // Find the collection document that contains the photo with the given photoId
    const collection = await collectionModel.findOne({ "videos._id": videoId });

    if (!collection) {
      return res.status(404).json({
        message: "Photo not found in any collection.",
      });
    }

    // Find the photo in the photos array using the provided photoId
    const video = collection.videos.find(
      (video) => video._id.toString() === videoId
    );
    if (!video) {
      return res.status(404).json({
        message: "video not found.",
      });
    }

    // Check if the user has already liked the photo
    if (video.likedBy.includes(browserId)) {
      return res.status(409).json({
        message: "User has already liked this video.",
      });
    }

    // Update likeCount and likedBy array
    video.likeCount += 1;
    video.likedBy.push(browserId);

    // Save the changes to the collection document
    await collection.save();

    res.status(200).json({
      message: "video liked successfully.",
      likedPhoto: video,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while liking the video.",
      error,
    });
  }
};

// POST METHOD - Add More videos
const AddMorevideosController = async (req, res) => {
  try {
    const { collectionId } = req.body;
    const videos = req.files && req.files.videos; // Check if req.files and req.files.videos are defined

    if (!videos) {
      return res.status(400).json({
        message: "No video files found in the request.",
      });
    }

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
        public_id: `video_${Date.now()}`,
      });

      videosArr.push({
        public_id: result.public_id,
        url: result.secure_url,
        size: result.bytes,
        name: videos.name,
      });
    }

    const updatedPost = await collectionModel.findByIdAndUpdate(
      collectionId,
      { $push: { videos: { $each: videosArr } } },
      { new: true }
    );

    res.status(200).json({
      message: "Added additional videos successfully",
      updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading additional videos",
      error,
    });
  }
};


// GET METHOD
const GetVideoCollectionController = async (req, res) => {
  try {
    const { authId } = req.query; // Access authId from query parameters
    const details = await collectionModel.find({ authId }).sort({createdAt: -1});
    res.status(200).json({
      message: "Get collection details successfully",
      details,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving details",
      error,
    });
  }
};

// GET METHOD BY ID
const GetVideoCollectionIdController = async (req, res) => {
  try {
    const details = await collectionModel.findById(req.params.id).sort({createdAt: -1});
    res.status(200).json({
      message: "Get video collection details by id successfully",
      details,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving details",
      error,
    });
  }
};

module.exports = {
  AddVideoCollectionController,
  AddMorevideosController,
  GetVideoCollectionController,
  GetVideoCollectionIdController,
  LikeVideoController
};
