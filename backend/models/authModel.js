const mongoose = require("mongoose");

//schema design:
const authSchema = mongoose.Schema(
  {
    authName: {
      type: String,
    },
    authEmail: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    authPassword: {
      type: String,
      required: [true, "password is required"],
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

//export:
module.exports = mongoose.model("authModel", authSchema);
