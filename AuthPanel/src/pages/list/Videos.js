import React, { useState, useEffect } from "react";
import ModalVideo from "../list/ModalVideo";
import ModalAddVideo from "../list/ModalAddVideo";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import axios from "axios";
import BASE_URL from "../../components/BASE_URL";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Video = () => {
  const [collections, setCollections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState("");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const loginId = localStorage.getItem("authId");
        const response = await axios.get(
          `${BASE_URL}/api/auth/get-video-collection?authId=${loginId}`
        );
        const data = response.data;
        setCollections(data.details);
        if (data.details.length > 0) {
          setSelectedCollectionId(data.details[0]._id);
        }
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    };

    fetchCollections();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleAdModal = () => {
    setIsModal1Open(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCloseModal = () => {
    setIsModal1Open(false);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="newContainer ml-2">
          <div className="top">
            <h3>Video Gallery</h3>
          </div>
          <div className="subList">
            <ModalVideo isOpen={isModalOpen} onClose={handleCloseModal} />

            <span onClick={handleOpenModal}>
              <AddCircleOutlineOutlinedIcon fontSize="25px" color="#6439ff" />
              &nbsp;Add New Collection
            </span>
          </div>

          <div className="imagecollection">
            <div className="bottom">
              <div className="row space-y-4 p-2">
                {collections.map((collection) => (
                  <div key={collection._id} className="column bg-gray-100">
                    <h3>
                      <strong>{collection.VideoCollectionName}</strong>
                      &nbsp; &nbsp;{" "}
                      <ModalAddVideo
                        isOpen={isModal1Open}
                        onClose={handleAddCloseModal}
                        selectedCollectionId={selectedCollectionId}
                      />
                      <span>
                        <AddCircleOutlineOutlinedIcon
                          fontSize="25px"
                          color="#6439ff"
                          onClick={handleAdModal}
                        />
                        Add More
                      </span>
                      <p>
                        <strong>Invite Type:</strong> {collection.inviteType}
                      </p>
                    </h3>

                    <ul>
                      {collection.videos.map((video) => (
                        <li key={video._id}>
                          <video
                            height="300"
                            className=" h-[300px]"
                            src={video.url}
                            controls
                          />
                          <p>
                            <strong>Name:</strong> {video.name}
                          </p>
                          <p>
                            <strong>Size:</strong>{" "}
                            {(video.size / 1024).toFixed(2)} KB
                          </p>
                          <p className="flex">
                            <span>
                              {" "}
                              <FavoriteIcon></FavoriteIcon> {video.likeCount}
                            </span>{" "}
                            &nbsp;&nbsp;
                            <span>Liked By : {video.likedBy}</span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
