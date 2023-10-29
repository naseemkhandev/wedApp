const mongoose = require("mongoose");

const accordionSchema = new mongoose.Schema({
  question: { type: String, required: false },
  answer: { type: String, required: false },
});

const blog_schema = new mongoose.Schema(
  {
    author: { type: String },
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
    title: { type: String },
    desc: { type: String },
    hashtag: [String],
    username: { type: String },
    uid: { type: String },
    accordion: [accordionSchema], // Define the accordion field as an array of objects
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog_schema", blog_schema);

module.exports = Blog;
