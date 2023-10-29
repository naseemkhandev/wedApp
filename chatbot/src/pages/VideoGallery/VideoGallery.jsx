import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../utils/URL";
import TopNav from "../../components/TopNav/TopNav";
import { FcFolder } from "react-icons/fc";

const VideoGallery = () => {
  const [imgCollections, setImgCollections] = useState([]);
  const storedType = localStorage.getItem("type");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPath = localStorage.getItem("pathID");
        const response = await axios.get(
          `${API}/api/auth/get-video-collection?authId=${storedPath}`
        );
        const data = response.data;
        let filteredData = [];
        if (storedType === "close") {
          filteredData = data.details;
        } else {
          filteredData = data.details.filter(
            (collection) => collection.inviteType === storedType
          );
        }

        setImgCollections(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [storedType]);

  return (
    <TopNav routeLink={"/"} barTitle={"Video Gallery"}>
      {/* DISPLAY COLLECTIONS START*/}
      <div className="w-full grid grid-cols-6 sm:grid-cols-2 p-2 gap-3 overflow-y-scroll mt-1">
        {imgCollections?.map((i) => (
          <div
            key={i._id}
            className="relative flex flex-col items-center w-full h-fit rounded-xl overflow-hidden"
          >
            <Link className="" to={`/video_gallery/videos/${i._id}`}>
              <img
                className="w-[140px] object-contain rounded-md overflow-hidden  active:scale-95"
                src="https://i.postimg.cc/Nfksftt7/And-so-the-adventure-begins.png"
                alt=""
              />
              {/* <FcFolder size={120} /> */}
            </Link>

            <p className="text-center text-[13px] p-1">
              {i.VideoCollectionName}
            </p>
          </div>
        ))}
      </div>
      {/* DISPLAY COLLECTIONS END*/}
    </TopNav>
  );
};

export default VideoGallery;
