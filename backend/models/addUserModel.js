const mongoose = require("mongoose");

const addUserSchema = new mongoose.Schema(
  {
    loginId: {
      type: String,
      required: true,
    },
    guestEmail: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    guestName: {
      type: String,
      required: true,
    },
    guestStatus: {
      type: String,
      required: false,
    },
    inviteType: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("addUser", addUserSchema);
