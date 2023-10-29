const mongoose = require("mongoose");
// import mongoose from "mongoose";

const BrowserIdSchema = new mongoose.Schema(
  {
    browserId: {
      type: String,
      //   required: true,
      unique: true,
    },
    authId: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BrowserIdModel", BrowserIdSchema);
