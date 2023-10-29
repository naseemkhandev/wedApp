const mongoose = require("mongoose");

//Welcome message model:
const PostSchema = new mongoose.Schema(
  {
    authId: {
      type: String,
      required: true,
    },
    order: {
      type: String,
    },
    messages: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "There must be at least one message.",
      },
    },
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("weddingWelcomeDetails", PostSchema);
