const weddingWelcomeDetails = require("../models/chatConvoModel/welcomeModel");
const cloudinary = require("../utils/cloudinary");

// POST METHOD:
const addDetailsController = async (req, res) => {
  try {
    const { authId, order, messages } = req.body;


    const photo = req.files.photo;

    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "Wedding",
    });

    const savedPost = await weddingWelcomeDetails.create({
      authId,
      order,
      messages,
      photo: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(200).json({
      message: "Added welcome details successfully",
      savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

// PUT METHOD:
const updateDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    const { messages } = req.body;

    const existingDetails = await weddingWelcomeDetails.findById(id);

    if (!existingDetails) {
      return res.status(404).json({ message: "Welcome details not found" });
    }

    let updatedPhoto = existingDetails.photo;

    if (req.files && req.files.photo) {
      const photo = req.files.photo;

      const result = await cloudinary.uploader.upload(photo.tempFilePath, {
        folder: "Wedding",
      });

      updatedPhoto = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    existingDetails.messages = messages;
    existingDetails.photo = updatedPhoto;

    const savedPost = await existingDetails.save();

    res.status(200).json({
      message: "Updated welcome details successfully",
      savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

//GET METHOD:
const getDetailsController = async (req, res) => {
  const { authId } = req.query;
  try {
    const details = await weddingWelcomeDetails.find({ authId });
    res.status(200).json({
      message: "get successfully",
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
  addDetailsController,
  updateDetailsController,
  getDetailsController,
};
