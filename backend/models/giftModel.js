const mongoose = require("mongoose");
// Wedding event model:
const GiftSchema = new mongoose.Schema(
  {
    authId: {
      type: String,
      required: true,
    },
    inviteType: {
      type: String,
      required: false,
    },
    userName: {
      type: String,
      required: false,
    },
    giftName: {
      type: String,
      required: true,
    },

    receivedGift: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GiftRegistry", GiftSchema);
