// require("dotenv").config({ path: ".env" });
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyparser = require("body-parser");
const connectDB = require("./config/mongoDb");
const welcomeDetails = require("./routes/chatRoutes/welcomeDetails");
const eventDetails = require("./routes/chatRoutes/eventDetails");
const addUser = require("./routes/addUser");
const authRoute = require("./routes/authRoute");
const mergeRoute = require("./routes/mergeRoute");
const collectionRoute = require("./routes/collectionRoute");
const videoCollectionRoute = require("./routes/videoCollectionRoute");
const pollsRoute = require("./routes/pollsRoute");
const musicListRoute = require("./routes/musicListRoute");
const gitfRoute = require("./routes/giftRoute");
const calenderRoute = require("./routes/calenderRoute");
const count = require("./routes/count");
const browserID = require("./routes/browserIdRoute");
const suggestSongsRoute = require("./routes/suggestSongsRoute");
const inviteCardRoute = require("./routes/inviteCardRoute");
const session = require("express-session");
const dotenv = require("dotenv");
const multer = require("multer");
// TEST MODEL:
const chatRouter = require("./routes/chatRoutes/chatRouter");
const test = require("./routes/chatRoutes/test");
const testR = require("./Test/testRouter");

// ChatBot Route paths:
const datetimes = require("./routes/chatRoutes/dateTimeRoute");
const venuelocations = require("./routes/chatRoutes/venueRoute");
const photosAndvideos = require("./routes/chatRoutes/photosVideosRoute");
const mergedChatRoutes = require("./routes/chatRoutes/mergedchatroutes");
const chatTitleRoute = require("./routes/chatRoutes/chatTitleRoute");

const app = express();

// MongoDB connect:
connectDB();

// File Upload:
const fileUpload = require("express-fileupload");

// Middlewares:
// app.use(logger("dev"));
// app.use(bodyParser.text());

//Middlewares:
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.json());
app.use(express.json({ limit: Infinity }));
app.use(express.urlencoded({ limit: Infinity, extended: true }));
// app.use(cookieParser());
app.use(cors());

//Config env file:
dotenv.config();

// File Upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Configure session middleware
app.use(
  session({
    secret: "aA@pjahcbjhahfh@%gvhag#$hbdc&jbjH!",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes:

// Chatbot Routes:
app.use("/api/auth", welcomeDetails);
app.use("/api/auth", datetimes);
app.use("/api/auth", venuelocations);
app.use("/api/auth", photosAndvideos);
app.use("/api/auth", mergedChatRoutes);
app.use("/api/auth", chatTitleRoute);
app.use("/api/auth", browserID);

// TEST
app.use("/api/auth", chatRouter);
app.use("/api/auth", test);

// EVENT DETAILS
app.use("/api/weddingeventdetails", eventDetails);
// Merge above two API details:
app.use("/api/mergedetails", mergeRoute);
// Auth route:
app.use("/api/auth", authRoute);
// ADD NEW USER
app.use("/api/adduser", addUser);
// Collection route:
app.use("/api/auth", collectionRoute);
// Video collection route:
app.use("/api/auth", videoCollectionRoute);
// Polls route:
app.use("/api/auth", pollsRoute);
// Playlist route:
app.use("/api/auth", musicListRoute);
// Gift List route:
app.use("/api/auth", gitfRoute);
// Calendar events route:
app.use("/api/auth", calenderRoute);
// Count route:
app.use("/api/auth", count);
// Suggestion Playlists:
app.use("/api/auth", suggestSongsRoute);
// Invite card:
app.use("/api/auth", inviteCardRoute);

// Rest API:
app.get("/", (req, res) => {
  res.send("<h1>Hello There! Backend connected</h1>");
});

// PORT
const PORT = process.env.PORT || 8500;

// Run server:
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode, ${PORT}`);
});
