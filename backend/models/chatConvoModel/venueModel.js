const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
  authId: {
    type: String,
    required: true,
  },
  order: {
    type: String,
  },

  venue: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("VenueSchema", VenueSchema);
