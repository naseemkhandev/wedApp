const mongoose = require("mongoose");
// Wedding event model:
const PhotosVideosSchema = new mongoose.Schema({
  authId: {
    type: String,
    required: true,
  },
  order: {
    type: String,
  },
  photos: [
    {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
      size: {
        type: Number,
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
    },
  ],
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
    },
  ],
});
module.exports = mongoose.model("PhotosVideosSchema", PhotosVideosSchema);
