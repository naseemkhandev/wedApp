// Images.js
import React, { useState, useEffect } from "react";
import "./list.scss";
import ModalLayout from "../list/ModalLayout";
import ModalAddImages from "../list/ModalAddImages";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import axios from "axios";
import BASE_URL from "../../components/BASE_URL";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Images = () => {
  const [collections, setCollections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState("");

  const fetchCollections = async () => {
    try {
      const loginId = localStorage.getItem("authId");
      const response = await axios.get(
        `${BASE_URL}/api/auth/get-collection?authId=${loginId}`
      );
      const data = response.data;

      if (data && data.details && data.details.length > 0) {
        setCollections(data.details);
        setSelectedCollectionId(data?.details);
        console.log(data?.details);
      } else {
        // Handle the case where data is empty or undefined
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleAddCollection = (newCollection) => {
    // Update the collections state with the new collection
    setCollections([...collections, newCollection]);

    // Set the new collection as the selected collection
    setSelectedCollectionId(newCollection?._id);

    // Close the modal
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAdModal = () => {
    setIsModal1Open(true);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="newContainer ml-2">
          <div className="top">
            <h3>Images Hub</h3>
          </div>
          <div className="subList">
            <ModalLayout
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              addCollection={handleAddCollection}
              fetchCollections={fetchCollections}
            />

            <span>
              <AddCircleOutlineOutlinedIcon
                fontSize="25px"
                color="#6439ff"
                onClick={handleOpenModal}
              />
              Add new Collection
            </span>
          </div>

          <div className="imagecollection">
            <div className="bottom">
              <div className="row space-y-4 p-2">
                {collections?.map((collection) => (
                  <div key={collection?._id} className="column bg-gray-100">
                    <h4>
                      <strong className=" text-lg mb-2">
                        {collection?.collectionName}
                      </strong>
                      &nbsp;&nbsp;
                      <ModalAddImages
                        isOpen={isModal1Open}
                        onClose={() => setIsModal1Open(false)}
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
                    </h4>
                    <div className="grid mt-2 grid-cols-1 md:grid-cols-3 gap-4">
                      {collection?.photos?.map((photo) => (
                        <div key={photo._id}>
                          <div className="image-item">
                            <hr />
                            <div className="flex mt-3">
                              <img
                                src={photo?.url}
                                alt={photo.name}
                                className="w-20 h-20 object-contain"
                              />
                              <div className="ml-4">
                                <p className="max-w-[320px] overflow-hidden">
                                  <strong>Name:</strong> {photo.name}
                                </p>
                                <p>
                                  <strong>Size:</strong>{" "}
                                  {(photo.size / 1024).toFixed(2)} KB
                                </p>
                                <p className="flex">
                                  <span>
                                    {" "}
                                    <FavoriteIcon></FavoriteIcon>{" "}
                                    {photo?.likeCount}
                                  </span>{" "}
                                  &nbsp;&nbsp;
                                  {/* <span>Liked By : {photo.likedBy}</span> */}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default Images;
