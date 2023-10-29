const collectionModel = require("../models/collectionModel");
const browserIdModel = require("../models/browserIdModel");
const cloudinary = require("../utils/cloudinary");

// POST METHOD
const AddCollectionController = async (req, res) => {
  try {
    const { authId, collectionName, inviteType } = req.body;
    const photos = req.files.photos;

    let photosArr = [];
    if (Array.isArray(photos)) {
      for (const photo of photos) {
        const result = await cloudinary.uploader.upload(photo.tempFilePath, {
          folder: "Collections",
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
        folder: "Collections",
        public_id: `photo_${Date.now()}`,
      });

      photosArr.push({
        public_id: result.public_id,
        url: result.secure_url,
        size: result.bytes,
        name: photos.name,
      });
    }

    const savedPost = await collectionModel.create({
      authId,
      collectionName,
      inviteType,
      photos: photosArr,
    });

    res.status(200).json({
      message: "Added collection details successfully",
      savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading photos",
      error,
    });
  }
};

// PUT METHOD
const LikePhotoController = async (req, res) => {
  try {
    const { photoId } = req.params;
    const { browserId } = req.body;

    // Find the collection document that contains the photo with the given photoId
    const collection = await collectionModel.findOne({ "photos._id": photoId });

    if (!collection) {
      return res.status(404).json({
        message: "Photo not found in any collection.",
      });
    }

    // Find the photo in the photos array using the provided photoId
    const photo = collection.photos.find(
      (photo) => photo._id.toString() === photoId
    );

    if (!photo) {
      return res.status(404).json({
        message: "Photo not found.",
      });
    }

    // Check if the user has already liked the photo
    if (photo.likedBy.includes(browserId)) {
      return res.status(409).json({
        message: "User has already liked this photo.",
      });
    }

    // Update likeCount and likedBy array
    photo.likeCount += 1;
    photo.likedBy.push(browserId);

    // Save the changes to the collection document
    await collection.save();

    res.status(200).json({
      message: "Photo liked successfully.",
      likedPhoto: photo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while liking the photo.",
      error,
    });
  }
};

// GetPhotoController
const GetPhotoController = async (req, res) => {};

// POST METHOD - Add More Photos
const AddMorePhotosController = async (req, res) => {
  try {
    const { collectionId } = req.body;
    const photos = req.files.photos;

    let photosArr = [];
    if (Array.isArray(photos)) {
      for (const photo of photos) {
        const result = await cloudinary.uploader.upload(photo.tempFilePath, {
          folder: "Collections",
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
        folder: "Collections",
        public_id: `photo_${Date.now()}`,
      });

      photosArr.push({
        public_id: result.public_id,
        url: result.secure_url,
        size: result.bytes,
        name: photos.name,
      });
    }

    const updatedPost = await collectionModel.findByIdAndUpdate(
      collectionId,
      { $push: { photos: { $each: photosArr } } },
      { new: true }
    );

    res.status(200).json({
      message: "Added additional photos successfully",
      updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading additional photos",
      error,
    });
  }
};

// GET METHOD
const GetCollectionController = async (req, res) => {
  try {
    const { authId } = req.query;
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

// GET METHOD
const GetCollectionIdController = async (req, res) => {
  try {
    const details = await collectionModel.findById(req.params.id).sort({createdAt: -1});
    res.status(200).json({
      message: "Get collection  details by id successfully",
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
  AddCollectionController,
  AddMorePhotosController,
  GetCollectionController,
  GetCollectionIdController,
  LikePhotoController,
  GetPhotoController,
};
