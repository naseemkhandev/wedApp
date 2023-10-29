const mongoose = require("mongoose");
// Wedding event model:
const InviteCardSchema = new mongoose.Schema(
  {
    authId: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
    },
    inviteType: {
      type: String,
      required: false,
    },
    inviteCardName: {
      type: String,
      required: false,
    },

    pdf: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InviteCard", InviteCardSchema);
