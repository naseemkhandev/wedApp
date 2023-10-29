const mongoose = require("mongoose");

const profile_schema = new mongoose.Schema(
  {
    username: { type: String },
    photo: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    username: { type: String },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("profile_schema", profile_schema);

module.exports = Profile;
