const mongoose = require("mongoose");

//Welcome message model:
const DateTimeSchema = new mongoose.Schema({
  authId: {
    type: String,
    required: true,
  },
  order: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("DateTimeSchema", DateTimeSchema);
