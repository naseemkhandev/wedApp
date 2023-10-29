const eventDetails = require("../models/chatConvoModel/eventModel");
const weddingWelcomeDetails = require("../models/chatConvoModel/welcomeModel");

// GET METHOD
const getMergedDetailsController = async (req, res) => {
  const { authId } = req.query;

  try {
    const mergedData = await weddingWelcomeDetails.aggregate([
      {
        $match: {
          authId: authId
        }
      },
      {
        $lookup: {
          from: "eventdetails",
          localField: "authId",
          foreignField: "authId",
          as: "eventDetails",
        },
      },
      {
        $project: {
          messages: 1,
          photo: 1,
          eventDetails: {
            $arrayElemAt: ["$eventDetails", 0],
          },
        },
      },
    ]);

    res.status(200).json({
      message: "Merged details retrieved successfully",
      mergedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving merged details",
      error,
    });
  }
};

module.exports = { getMergedDetailsController };


