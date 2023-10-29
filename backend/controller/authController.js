const jwt = require("jsonwebtoken");
const { comparePass, hashPassword } = require("../helper/authHelper");
const authModel = require("../models/authModel");
const secretKey = "AZMOIHTF&^16^%&@^*&56UTGUGFWY!DUYWUD&^%!";
const cloudinary = require("../utils/cloudinary");

// 1. POST || LOGIN:
const loginController = async (req, res) => {
  try {
    const { authEmail, authPassword } = req.body;
    const user = await authModel.findOne({ authEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const match = await comparePass(authPassword, user.authPassword);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Password not matched",
      });
    }

    // Generate JWT token
    const token = await jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "3h",
    });

    // Store the user ID in the session
    req.session.userId = user._id;

    // Response with token and login details
    res.status(200).json({
      success: true,
      token,
      user: {
        authName: user.authName,
        authEmail: user.authEmail,
        authId: user._id,
        authPhoto: user.photo,
        // Include any other desired login details
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
    });
  }
};

// 2. POST || REGISTER:
const registerController = async (req, res) => {
  try {
    const { authName, authEmail, authPassword } = req.body;
    const existingUser = await authModel.findOne({ authEmail });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered",
      });
    }

    const hashedPassword = await hashPassword(authPassword);
    const newUser = await new authModel({
      authName,
      authEmail,
      authPassword: hashedPassword,
    }).save();

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
    });
  }
};

// 3. GET || USER DETAILS BY EMAIL:
const getUserDetailsByEmail = async (req, res) => {
  try {
    const authEmail = req.params.authEmail; // Assuming you pass the user's email as a URL parameter
    const user = await authModel.findOne({ authEmail });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      success: true,
      user: {
        userId: user._id,
        authName: user.authName,
        authEmail: user.authEmail,
        authPhoto: user.photo,
        // Include any other desired user details
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
    });
  }
};

const protectedController = async (req, res) => {
  res.send("Protected test route");
};

// PUT API:
const updateUserDetails = async (req, res) => {
  try {
    const authId = req.params.authId;
    const { authName } = req.body;
    const photo = req.files ? req.files.photo : null;

    // Find the existing user by ID
    const existingAuth = await authModel.findById(authId);

    if (!existingAuth) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's authName if provided
    if (authName) {
      existingAuth.authName = authName;
    }

    // If a new photo is provided, update it
    if (photo) {
      // Check the file extension and convert to WebP if necessary
      const supportedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
      const fileExtension = photo.name
        .substring(photo.name.lastIndexOf("."))
        .toLowerCase();

      if (supportedExtensions.includes(fileExtension)) {
        // Convert to WebP format
        const webpResult = await cloudinary.uploader.upload(
          photo.tempFilePath,
          {
            folder: "User Profile",
            format: "webp",
          }
        );
        existingAuth.photo = {
          public_id: webpResult.public_id,
          url: webpResult.secure_url,
        };
      } else {
        // Keep the original format
        const result = await cloudinary.uploader.upload(photo.tempFilePath, {
          folder: "User Profile",
        });
        existingAuth.photo = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }
    }

    // Save the updated user
    const updatedUser = await existingAuth.save();
    res.status(200).json({
      message: "Updated user profile successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  protectedController,
  getUserDetailsByEmail,
  updateUserDetails,
};
