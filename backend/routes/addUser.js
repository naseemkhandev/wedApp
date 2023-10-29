const express = require("express");
// const addUserModel = require("../models/addUserModel");
const { addUserController , getAllUserController, getSingleUserController, getCountController} = require("../controller/addUserController");
const addUserModel = require("../models/addUserModel");

const router = express.Router();

//POST || ADD USER:
router.post("/", addUserController);

//GET || ALL USER DETAILS:
router.get("/", getAllUserController);

//GET || SINGLE USER DETAILS:
router.get("/:loginId", getSingleUserController);

router.get('/:loginId/count', async (req, res) => {
    const loginId = req.params.loginId;
  
    try {
      const emailCount = await addUserModel.countDocuments({ loginId });
      res.status(200).json({
        message: 'Email count retrieved successfully',
        emailCount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error retrieving email count',
        error,
      });
    }
  });


module.exports = router;
