// models/Playlist.js
const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  authId: {
    type: String,
    required: true,
  },
  inviteType: {
    type: String,
    required: false,
  },
  playlistName: {
    type: String,
    required: true,
  },
  songs: [{
    name: {
      type: String,
      required: true,
    },
    externalUrl: {
      type: String,
      required: true,
    },
  }],
});

const Playlist = mongoose.model('PlaylistItem', playlistSchema);

module.exports = Playlist;
