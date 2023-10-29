const express = require("express");
const Post = require("../../models/test");
// const BlogBanner = require("../models/blog/blog_banner");
const cloudinary = require("../../utils/cloudinary");
// const sharp = require("sharp");

const router = express.Router();

// Replace "YOUR_GENERATED_API_KEY" with your actual API key
const validApiKey = "indohype@2key";

// CREATE POST
router.post("/submit-wedding", async (req, res) => {
  try {
    const { author, title, desc, username } = req.body;
    const accordionData = JSON.parse(req.body.accordion);
    const hashtagsArray = JSON.parse(req.body.hashtags);

    const photo = req.files ? req.files.photo : null;

    let result = null;
    if (photo) {
      // Check the file extension and convert to WebP if necessary
      const supportedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
      const fileExtension = photo.name
        .substring(photo.name.lastIndexOf("."))
        .toLowerCase();

      if (supportedExtensions.includes(fileExtension)) {
        // Convert to WebP format
        const webpResult = await cloudinary.uploader.upload(
          photo.tempFilePath,
          {
            folder: "Indohype",
            format: "webp",
          }
        );
        result = webpResult;
      } else {
        // Keep the original format
        result = await cloudinary.uploader.upload(photo.tempFilePath, {
          folder: "Indohype",
        });
      }
    }

    const newPost = new Post({
      author,
      title,
      desc,
      hashtag: hashtagsArray,
      username,
      accordion: accordionData,
      photo: photo
        ? {
            public_id: result.public_id,
            url: result.secure_url,
            name: photo.name,
          }
        : null,
    });

    const savedPost = await newPost.save();

    res.status(200).json({
      message: "Added blog details successfully",
      savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

// GET | GET ALL BLOG POSTS (Including Blog and Blog Banner) with Pagination:
router.get("/get_all_posts", async (req, res) => {
  const providedApiKey = req.headers["x-api-key"];

  if (providedApiKey !== validApiKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    // Fetch posts from the Blog collection
    const blogPosts = await Post.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Fetch posts from the Blog Banner collection
    const blogBannerPosts = await BlogBanner.find().sort({ createdAt: -1 });
    // .skip((page - 1) * limit)
    // .limit(limit)
    // .sort({ createdAt: -1 });

    // Fetch the total counts for each collection
    const totalBlogPosts = await Post.countDocuments();
    const totalBlogBannerPosts = await BlogBanner.countDocuments();

    // Calculate total pages for each collection
    const totalPagesBlogPosts = Math.ceil(totalBlogPosts / limit);
    const totalPagesBlogBannerPosts = Math.ceil(totalBlogBannerPosts / limit);

    // Create separate arrays for blog posts and blog banner posts
    const blogPostsArray = [...blogPosts];
    const blogBannerPostsArray = [...blogBannerPosts];

    res.status(200).json({
      totalPosts: totalBlogPosts,
      totalPages: totalPagesBlogPosts,
      currentPage: page,
      banner: blogBannerPostsArray,
      posts: blogPostsArray,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

// GET | GET SINGLE BLOG DETAILS:
router.get("/get_post/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post =
      (await Post.findById(postId)) || (await BlogBanner.findById(postId));

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

// SEARCH BLOG POTS:
router.get("/search_posts", async (req, res) => {
  const providedApiKey = req.headers["x-api-key"];

  if (providedApiKey !== validApiKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { title, desc } = req.query;
    const queryObj = {};

    if (title) {
      queryObj.title = { $regex: title, $options: "i" };
    }
    if (desc) {
      queryObj.desc = { $regex: desc, $options: "i" };
    }

    // Pagination:
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    // Get the total count of matching documents
    const totalCount = await Post.countDocuments(queryObj);

    // Calculate total pages based on total count and limit
    const totalPages = Math.ceil(totalCount / limit);

    // Fetch search results
    const searchPosts = await Post.find(queryObj)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Search blog posts",
      nbHits: searchPosts.length,
      totalBlogPosts: totalCount,
      totalBlogPages: totalPages,
      currentBlogPage: page,
      searchPosts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});



// PUT | UPDATE BLOG:

router.put("/update_post/:postId", async (req, res) => {
  const providedApiKey = req.headers["x-api-key"];

  if (providedApiKey !== validApiKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const postId = req.params.postId;
    const { author, title, desc, accordion } = req.body;
    const photo = req.files ? req.files.photo : null;

    // Find the existing post by ID
    const existingPost = await Post.findById(postId);

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    // If a new photo is provided, update it
    if (photo) {
      // Check the file extension and convert to WebP if necessary (similar to POST)
      const supportedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
      const fileExtension = photo.name
        .substring(photo.name.lastIndexOf("."))
        .toLowerCase();

      if (supportedExtensions.includes(fileExtension)) {
        // Convert to WebP format
        const webpResult = await cloudinary.uploader.upload(
          photo.tempFilePath,
          {
            folder: "Indohype",
            format: "webp",
          }
        );
        existingPost.photo = {
          public_id: webpResult.public_id,
          url: webpResult.secure_url,
          name: photo.name,
        };
      } else {
        // Keep the original format
        const result = await cloudinary.uploader.upload(photo.tempFilePath, {
          folder: "Indohype",
        });
        existingPost.photo = {
          public_id: result.public_id,
          url: result.secure_url,
          name: photo.name,
        };
      }
    }

    // Update other post properties if they are provided in the request body
    if (author !== undefined) {
      existingPost.author = author;
    }
    if (title !== undefined) {
      existingPost.title = title;
    }
    if (desc !== undefined) {
      existingPost.desc = desc;
    }
    
    // Update accordion data if provided
    if (accordion !== undefined) {
      existingPost.accordion = JSON.parse(accordion);
    }

    // Save the updated post
    const updatedPost = await existingPost.save();

    res.status(200).json({
      message: "Updated blog post successfully",
      updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});



// Delete a blog post by ID
router.delete("/delete_post/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the blog banner by ID
    const existingBanner = await Post.findById(postId);

    if (!existingBanner) {
      return res.status(404).json({ message: "Blog banner not found" });
    }

    // If the banner has an associated image on Cloudinary, delete it
    if (existingBanner.photo && existingBanner.photo.public_id) {
      const cloudinaryResult = await cloudinary.uploader.destroy(
        existingBanner.photo.public_id
      );
      // Check if the image was successfully deleted from Cloudinary
      if (cloudinaryResult.result !== "ok") {
        console.error("Failed to delete image from Cloudinary");
      }
    }

    // Delete the blog banner from the database
    await Post.deleteOne({ _id: postId });

    res.status(200).json({ message: "Deleted blog banner successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

module.exports = router;
