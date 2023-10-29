const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

//config env file:
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAMEX,
  api_key: process.env.CLOUD_APIX,
  api_secret: process.env.CLOUD_SECRETX,
});

module.exports = cloudinary;
