const mongoose = require("mongoose");

const TrySchema = new mongoose.Schema({
  order: {
    type: Number,
  },
  authId: {
    type: String,
  },
  chatId: { type: String },
  messages: [
    {
      text: {
        type: String,
      },
      priority: {
        type: Number,
      },
    },
  ],
  photos: [
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

const TryModel = mongoose.model("TrySchema", TrySchema);

module.exports = TryModel;
