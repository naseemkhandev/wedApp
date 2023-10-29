const mongoose = require("mongoose");
// Wedding event model:
const MusicSchema = new mongoose.Schema(
  {
    authId: {
      type: String,
      required: true,
    },
    inviteType: {
      type: String,
      required: false,
    },
    playListName: {
      type: String,
      required: true,
    },
    playListUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MusicPlaylist", MusicSchema);
