import React, { lazy, Suspense, useEffect, useState, memo } from "react";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import ChatBotHelper from "./Chatbot";
import Loading from "./components/Loading/Loading";
import { bgData } from "./data";

// Lazy load components
const HomeDesk = lazy(() => import("./desktopPages/HomeDesk/HomeDesk"));
const ImageHub = lazy(() => import("./pages/ImgHub/ImageHub"));
const ImageLists = lazy(() => import("./pages/ImgHub/ImageLists"));
const VideoGallery = lazy(() => import("./pages/VideoGallery/VideoGallery"));
const VideoLists = lazy(() => import("./pages/VideoGallery/VideoLists"));
const Polls = lazy(() => import("./pages/Polls/Polls"));
const VotePoll = lazy(() => import("./pages/Polls/VotePoll"));
const CountDown = lazy(() => import("./pages/CountDown/CountDown"));
const Calender = lazy(() => import("./pages/Calender/Calender"));
const Event = lazy(() => import("./pages/Calender/Event"));
const GiftRegistry = lazy(() => import("./pages/GiftRegistry/GiftRegistry"));
const Playlist = lazy(() => import("./pages/Playlist/Playlist"));
const CustomPlaylists = lazy(() => import("./pages/Playlist/CustomPlaylists"));
const Invite = lazy(() => import("./pages/Invite/Invite"));

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const storedType = localStorage.getItem("type");
  // const theme = localStorage.getItem("theme");
  const theme = location.pathname.split("/")[3];


  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const storedPath = localStorage.getItem("pathID");
    const theme = localStorage.getItem("theme");
    if (location.pathname === "/") {
      navigate(`/file/${storedType}/${theme}/${storedPath}`);
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    changeBackgroundImage(theme);
  }, [id]);

  const changeBackgroundImage = (name) => {
    const image = bgData.find((item) => item.name === name);
    if (image) {
      setBackgroundImage(image.url);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="relative flex items-center justify-center w-screen mx-auto h-screen">
        <div className="relative w-full h-full m-auto bg-transparent">
          <Routes>
            <Route path={`/file/close/a/:id`} element={<HomeDesk backgroundImage={backgroundImage} />} />
            <Route path={`/file/general/a/:id`} element={<HomeDesk backgroundImage={backgroundImage} />} />
            <Route path="/image_hub" element={<ImageHub />} />
            <Route path="/image_hub/images/:id" element={<ImageLists />} />
            <Route path="/video_gallery" element={<VideoGallery />} />
            <Route path="/video_gallery/videos/:id" element={<VideoLists />} />
            <Route path="/polls" element={<Polls />} />
            <Route path="/poll/:id" element={<VotePoll />} />
            <Route path="/count_down" element={<CountDown />} />
            <Route path="/calender" element={<Calender />} />
            <Route path="/event/:id" element={<Event />} />
            <Route path="/gift_registry" element={<GiftRegistry />} />
            <Route path="/playlists" element={<Playlist />} />
            <Route path="/playlists/:id" element={<CustomPlaylists />} />
            <Route path="/Invite" element={<Invite />} />
          </Routes>
        </div>
        <ChatBotHelper />
      </div>
    </Suspense>
  );
};

export default memo(App);
