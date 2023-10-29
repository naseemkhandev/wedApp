const mongoose = require("mongoose");
// Wedding event model:
const videoCollectionSchema = new mongoose.Schema(
  {
    authId: {
      type: String,
      required: true,
    },
    VideoCollectionName: {
      type: String,
      required: true,
    },
    inviteType: {
      type: String,
      required: false,
    },
    videos: [
      {
        public_id: {
          type: String,
          required: false,
        },
        url: {
          type: String,
          required: true,
        },
        size: {
          type: Number,
          required: false,
        },
        name: {
          type: String,
          required: false,
        },
        likeCount: {
          type: Number,
          default: 0,
        },
        likedBy: [
          {
            type: String,
            required: false,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("videoCollectionSchema", videoCollectionSchema);
