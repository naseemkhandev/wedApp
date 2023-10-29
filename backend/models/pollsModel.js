const mongoose = require("mongoose");
// Wedding event model:
const PollsSchema = new mongoose.Schema(
  {
    authId: {
      type: String,
      required: true,
    },
    inviteType: {
      type: String,
      required: false,
    },
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        text: String,
        count: { type: Number, default: 0 },

        voteCount: {
          type: Number,
          default: 0,
        },
        voteBy: [
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

module.exports = mongoose.model("Polls", PollsSchema);
