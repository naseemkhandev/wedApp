// Route to upload an invite card with a PDF
const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const InviteCard = require("../models/InviteCard");

// Route to upload an invite card with a PDF
router.post("/invite-card", async (req, res) => {
  try {
    const { authId, order, inviteType, inviteCardName } = req.body;
    const pdfFile = req.files.pdf;

    const result = await cloudinary.uploader.upload(pdfFile.tempFilePath, {
      folder: "InviteCards",
      use_filename: true, // Preserve the original filename
    });

    const newInviteCard = new InviteCard({
      authId,
      order,
      inviteType,
      inviteCardName,
      pdf: {
        public_id: result.public_id,
        url: result.secure_url,
        name: pdfFile.name,
      },
    });

    const savedInviteCard = await newInviteCard.save();

    res.status(200).json({
      message: "Added invite card details successfully",
      savedInviteCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

// Route to get invite cards
router.get("/get-invite-cards", async (req, res) => {
  try {
    const { authId } = req.query;

    const inviteCards = await InviteCard.find({ authId });

    if (inviteCards.length === 0) {
      return res.status(404).json({
        message: "No invite cards found for the provided authId.",
      });
    }

    res.status(200).json({
      message: "Invite cards retrieved successfully",
      inviteCards,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

// Route to download a PDF by _id
// Route to download a PDF by _id
router.get("/download-pdf/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const inviteCard = await InviteCard.findById(id);

    if (!inviteCard) {
      return res.status(404).json({
        message: "No invite card found for the provided _id.",
      });
    }

    // Set appropriate headers for download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${inviteCard.pdf.name}`
    );
    res.setHeader("Content-Type", "application/pdf");

    // Fetch and send the PDF from Cloudinary
    const cloudinaryResponse = await cloudinary.v2.api.resource(
      inviteCard.pdf.public_id
    );
    const pdfUrl = cloudinaryResponse.secure_url;
    axios.get(pdfUrl, { responseType: "stream" }).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

router.put("/update-invite-card/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { order, inviteType, inviteCardName } = req.body;

    let updatedFields = {
      order,
      inviteType,
      inviteCardName,
    };

    if (req.files && req.files.pdf) {
      const pdfFile = req.files.pdf;
      const result = await cloudinary.uploader.upload(pdfFile.tempFilePath, {
        folder: "Wedding",
      });

      updatedFields.pdf = {
        public_id: result.public_id,
        url: result.secure_url,
        name: pdfFile.name,
      };
    }

    const updatedInviteCard = await InviteCard.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    if (!updatedInviteCard) {
      return res.status(404).json({
        message: "No invite card found for the provided _id.",
      });
    }

    res.status(200).json({
      message: "Invite card updated successfully",
      updatedInviteCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

router.delete("/delete-invite-card/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInviteCard = await InviteCard.findByIdAndRemove(id);

    if (!deletedInviteCard) {
      return res.status(404).json({
        message: "No invite card found for the provided _id.",
      });
    }

    res.status(200).json({
      message: "Invite card deleted successfully",
      deletedInviteCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

module.exports = router;
