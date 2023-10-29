const express = require("express");
const router = express.Router();
const multer = require("multer");
const Wedding = require("../../models/chatConvoModel/chatModel");
const cloudinary = require("../../utils/cloudinary");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new wedding document
router.post("/chatdetails", async (req, res) => {
	try {
		// Prepare the data from the request
		let weddingData = req.body;

		// Parse messages and photos from JSON strings
		if (req.body.messages) {
			weddingData.messages = JSON.parse(req.body.messages);
		}
		// Parse messages and photos from JSON strings
		if (req.body.location) {
			weddingData.location = JSON.parse(req.body.location);
		}
		// Parse messages and photos from JSON strings
		if (req.body.options) {
			weddingData.options = JSON.parse(req.body.options);
		}

		if (req.body.photos) {
			weddingData.photos = JSON.parse(req.body.photos);
		}
		if (req.body.videos) {
			weddingData.videos = JSON.parse(req.body.videos);
		}
		if (req.body.chatId) {
			weddingData.chatId = JSON.parse(req.body.chatId);
		}
		if (req.body.chatTitle) {
			weddingData.chatTitle = JSON.parse(req.body.chatTitle);
		}
		if (req.body.order) {
			weddingData.order = JSON.parse(req.body.order);
		}
		if (req.body.authId) {
			weddingData.authId = JSON.parse(req.body.authId);
		}

		// Create the Wedding record
		const wedding = new Wedding(weddingData);
		console.log(wedding);
		// Save the record to the database
		await wedding.save();

		res.status(201).json(wedding);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// upload images and videos
router.post("/chatdetails/upload/resources", async (req, res) => {
	try {
		// console.log("files are here",req.files)
		const photos = req.files.photos;
		if (photos) {
			let photosArr = [];

			if (req.files) {
				const files = Array.isArray(req.files.photos)
					? req.files.photos
					: [req.files.photos];

				for (const file of files) {
					console.log("Cloudinary Upload Result: ", file);
					console.log(cloudinary.config());
					const result = await cloudinary.uploader.upload(
						file.tempFilePath,
						{
							folder: "WeddingEvent",
							public_id: `photo_${Date.now()}`,
						},
						(error, result) => {
							if (error) {
								console.error("Error uploading image:", error);
							} else {
								console.log("Image uploaded:", result.url);
							}
						}
					);
					console.log("Cloudinary Upload Result: ", result);
					photosArr.push({
						public_id: result.public_id,
						url: result.secure_url,
					});
				}
			} else {
				photosArr = []; // No photos uploaded
			}

			return res.status(201).json(photosArr);
		}

		// VIDEOS:
		const videos = req.files.videos;
		if (videos) {
			let videosArr = [];
			if (Array.isArray(videos)) {
				for (const video of videos) {
					const result = await cloudinary.uploader.upload(video.tempFilePath, {
						resource_type: "video",
						folder: "Video_Collections",
						public_id: `video_${Date.now()}`,
					});

					videosArr.push({
						public_id: result.public_id,
						url: result.secure_url,
						size: result.bytes,
						name: video.name,
					});
				}
			} else {
				const result = await cloudinary.uploader.upload(videos.tempFilePath, {
					resource_type: "video",
					folder: "Video_Collections",
					public_id: `photo_${Date.now()}`,
				});

				videosArr.push({
					public_id: result.public_id,
					url: result.secure_url,
					size: result.bytes,
					name: videos.name,
				});
			}
			return res.status(201).json(videosArr);
		}
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// const express = require("express");
// const router = express.Router();
// const Wedding = require("../../models/chatConvoModel/chatModel"); // Update the path to your WeddingForm model
// const cloudinary = require("../../utils/cloudinary");

// // Create or update a wedding form based on the provided title
// router.post("/chatdetails", async (req, res) => {
//   try {
//     const { title, order, messages, location, options, photos } = req.body;

//     // Find the document with the provided title or create a new one if it doesn't exist
//     let weddingForm = await Wedding.findOne({ title });

//     if (!weddingForm) {
//       weddingForm = new Wedding({ title, forms: [] });
//     }

//     // Add the new wedding form to the forms array
//     weddingForm.forms.push({
//       order,
//       messages: JSON.parse(messages),
//       location: JSON.parse(location),
//       options: JSON.parse(options),
//       photos: JSON.parse(photos),
//     });

//     // Save the document
//     await weddingForm.save();

//     res.status(201).json(weddingForm);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// GET request to retrieve all entries
router.get("/chatdetails", async (req, res) => {
	const { authId } = req.query;
	try {
		const details = await Wedding.find({ authId });

		// Group data by chatId
		const groupedData = details.reduce((result, item) => {
			if (item.chatId) {
				if (!result[item.chatId]) {
					result[item.chatId] = [];
				}
				result[item.chatId].push(item);
			}
			return result;
		}, {});

		// Sort the chats by their creation date in reverse chronological order
		const sortedChats = Object.entries(groupedData).sort((a, b) => {
			const chatA = a[1][0]; // Get the first order of the chat
			const chatB = b[1][0]; // Get the first order of the chat
			return new Date(chatB.createdAt) - new Date(chatA.createdAt);
		});

		const sortedChatsData = sortedChats.reduce(
			(result, [chatId, chatOrders]) => {
				result[chatId] = chatOrders;
				return result;
			},
			{}
		);

		res.status(200).json({
			message: "Retrieved data successfully",
			details: sortedChatsData,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error retrieving data details",
			error,
		});
	}
});

// PUT request to update a specific field of a wedding // Update an existing wedding document

router.put("/chatdetails/:id", async (req, res) => {
	try {
		const weddingId = req.params.id;
		const updatedData = req.body;

		// Fetch the existing wedding document by ID
		const existingWedding = await Wedding.findById(weddingId);

		if (!existingWedding) {
			return res.status(404).json({ error: "Wedding not found " });
		}

		// Update the fields you want to change
		if (updatedData.messages) {
			existingWedding.messages = updatedData.messages;
		}
		if (updatedData.location) {
			existingWedding.location = updatedData.location;
		}
		if (updatedData.options) {
			existingWedding.options = updatedData.options;
		}

		// Handle photo and video uploads separately
		if (req.files) {
			if (req.files.photos) {
				const photosArr = [];
				const photos = Array.isArray(req.files.photos)
					? req.files.photos
					: [req.files.photos];
				for (const photo of photos) {
					const result = await cloudinary.uploader.upload(photo.tempFilePath, {
						folder: "WeddingEvent",
						public_id: `photo_${Date.now()}`,
					});
					photosArr.push({
						public_id: result.public_id,
						url: result.secure_url,
						priority: photo.priority || 100,
					});
				}
				existingWedding.photos = photosArr;
			}
			if (req.files.videos) {
				const videosArr = [];
				const videos = Array.isArray(req.files.videos)
					? req.files.videos
					: [req.files.videos];
				for (const video of videos) {
					const result = await cloudinary.uploader.upload(video.tempFilePath, {
						resource_type: "video",
						folder: "Video_Collections",
						public_id: `video_${Date.now()}`,
					});
					videosArr.push({
						public_id: result.public_id,
						url: result.secure_url,
						priority: video.priority || 100,
					});
				}
				existingWedding.videos = videosArr;
			}
		}

		// Save the updated document to the database
		const updatedWedding = await existingWedding.save();

		res.status(200).json(updatedWedding);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// EMPTY request, set empty fields at once
router.delete("/chatdetails/:id/set_empty", async (req, res) => {
	const { id } = req.params;

	try {
		// Find the document by ID
		const wedding = await Wedding.findById(id);

		if (!wedding) {
			return res.status(404).json({ message: "Wedding not found" });
		}

		// Clear all the fields in the document
		wedding.order = undefined;
		wedding.messages = [];
		wedding.location = [];
		wedding.date = undefined;
		wedding.time = undefined;
		wedding.photos = [];
		wedding.videos = [];
		wedding.options = [];
		wedding.textInput = undefined;

		await wedding.save();

		res.status(200).json({ message: "All fields deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred" });
	}
});

// DELETE request to delete the entire wedding document
router.delete("/chatdetails/:id", async (req, res) => {
	const { id } = req.params;

	try {
		// Find the document by ID and remove it
		await Wedding.findByIdAndRemove(id);

		res.status(200).json({ message: "Wedding document deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred" });
	}
});

// DELETE request to delete a specific field in the wedding document
router.delete("/chatdetails/:id/:field", async (req, res) => {
	const { id, field } = req.params;

	try {
		// Find the document by ID
		const wedding = await Wedding.findById(id);

		if (!wedding) {
			return res.status(404).json({ message: "Wedding not found" });
		}

		// Delete the specified field from the document
		wedding[field] = undefined;

		// Save the updated document
		await wedding.save();

		res.status(200).json({ message: `${field} field deleted successfully` });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred" });
	}
});

// DELETE request to delete a particular photo in the wedding document
router.delete("/chatdetails/:id/photos/:photoId", async (req, res) => {
	const { id, photoId } = req.params;

	try {
		const wedding = await Wedding.findById(id);

		if (!wedding) {
			return res.status(404).json({ message: "Wedding not found" });
		}

		const photoIndex = wedding.photos.findIndex(
			(photo) => photo._id.toString() === photoId
		);

		if (photoIndex === -1) {
			return res.status(404).json({ message: "Photo not found" });
		}

		wedding.photos.splice(photoIndex, 1);

		await wedding.save();

		res.status(200).json({ message: "Photo deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred" });
	}
});
// DELETE request to delete a particular video in the wedding document
router.delete("/chatdetails/:id/videos/:videoId", async (req, res) => {
	const { id, videoId } = req.params;

	try {
		// Find the document by ID
		const wedding = await Wedding.findById(id);

		if (!wedding) {
			return res.status(404).json({ message: "Wedding not found" });
		}

		// Find the index of the video in the videos array
		const videoIndex = wedding.videos.findIndex(
			(video) => video._id.toString() === videoId
		);

		if (videoIndex === -1) {
			return res.status(404).json({ message: "Video not found" });
		}

		// Remove the video from the videos array
		wedding.videos.splice(videoIndex, 1);

		// Save the updated document
		await wedding.save();

		res.status(200).json({ message: "Video deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred" });
	}
});

// POST method to add more photos to the wedding document
router.post("/chatdetails/:id/addPhotos", async (req, res) => {
	const { id } = req.params;

	try {
		const wedding = await Wedding.findById(id);

		if (!wedding) {
			return res.status(404).json({ error: "Wedding document not found" });
		}

		const photos = req.files.photos;

		let photosArr = [];
		if (Array.isArray(photos)) {
			for (const photo of photos) {
				const result = await cloudinary.uploader.upload(photo.tempFilePath, {
					folder: "WeddingEvent",
					public_id: `photo_${Date.now()}`,
				});

				photosArr.push({
					public_id: result.public_id,
					url: result.secure_url,
					size: result.bytes,
					name: photo.name,
					priority: photo.priority || 101,
				});
			}
		} else {
			const result = await cloudinary.uploader.upload(photos.tempFilePath, {
				folder: "WeddingEvent",
				public_id: `photo_${Date.now()}`,
			});

			photosArr.push({
				public_id: result.public_id,
				url: result.secure_url,
				size: result.bytes,
				name: photos.name,
				priority: photos.priority || 101,
			});
		}

		wedding.photos.push(...photosArr);

		// Save
		const updatedWedding = await wedding.save();

		res.status(200).json({
			message: "Added more photos successfully",
			updatedWedding,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred" });
	}
});

// POST method to add more videos to the wedding document
router.post("/chatdetails/:id/addVideos", async (req, res) => {
	const { id } = req.params;

	try {
		const wedding = await Wedding.findById(id);

		if (!wedding) {
			return res.status(404).json({ error: "Wedding document not found" });
		}

		const videos = req.files.videos;

		let videosArr = [];
		if (Array.isArray(videos)) {
			for (const video of videos) {
				const result = await cloudinary.uploader.upload(video.tempFilePath, {
					resource_type: "video",
					folder: "Video_Collections",
					public_id: `video_${Date.now()}`,
				});

				videosArr.push({
					public_id: result.public_id,
					url: result.secure_url,
					size: result.bytes,
					name: video.name,
					priority: video.priority || 102,
				});
			}
		} else {
			const result = await cloudinary.uploader.upload(videos.tempFilePath, {
				resource_type: "video",
				folder: "Video_Collections",
				public_id: `video_${Date.now()}`,
			});

			videosArr.push({
				public_id: result.public_id,
				url: result.secure_url,
				size: result.bytes,
				name: videos.name,
				priority: videos.priority || 103,
			});
		}

		wedding.videos.push(...videosArr);

		// Save
		const updatedWedding = await wedding.save();

		res.status(200).json({
			message: "Added more videos successfully",
			updatedWedding,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred" });
	}
});

module.exports = router;
