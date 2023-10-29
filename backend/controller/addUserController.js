const addUserModel = require("../models/addUserModel");

//POST
const addUserController = async (req, res) => {
  try {
    const { loginId, guestEmail, guestName, guestStatus, inviteType } =
      req.body;

    // check if user already exists //
    const existingUser = await addUserModel.findOne({ guestEmail });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "email already used",
      });
    }

    const savedUser = await addUserModel.create({
      loginId,
      guestEmail,
      guestName,
      guestStatus,
      inviteType,
    });

    res.status(200).json({
      success: true,
      message: "User added successfully",
      savedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

//GET ALL USER:
const getAllUserController = async (req, res) => {
  try {
    const userDetails = await addUserModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "get event details successfully",
      userDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving details",
      error,
    });
  }
};

//GET SINGLE USER:
const getSingleUserController = async (req, res) => {
  try {
    const user = await addUserModel
      .find({ loginId: req.params.loginId })
      .sort({ createdAt: -1 });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving user",
      error,
    });
  }
};

const getCountController = async (req, res) => {


  try {
    const emailCount = await addUserModel.countDocuments({ loginId: req.params.loginId });
    res.status(200).json({
      message: "Email count retrieved successfully",
      emailCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving email count",
      error,
    });
  }
};

module.exports = {
  addUserController,
  getAllUserController,
  getSingleUserController,
  getCountController,
};
