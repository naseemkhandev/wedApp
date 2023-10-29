const mongoose = require("mongoose");

const chatTitleSchema = new mongoose.Schema(
  {
    authId: { type: String },
    chatTitle: { type: String },
    uid: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chatTitleModel", chatTitleSchema);
