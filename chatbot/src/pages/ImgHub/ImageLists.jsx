import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { API } from "../../utils/URL";
import TopNav from "../../components/TopNav/TopNav";

const ImageLists = () => {
  const { id } = useParams();
  const [getLists, setGetLists] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${API}/api/auth/get-collection/${id}`
        );
        const data = response.data;
        console.log(data);
        setIsLoading(false);
        setGetLists(data?.details);

        console.log("");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, getLists]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedImage]);

  const handleImageModel = (image) => {
    setSelectedImage(image);
  };

  let storedDeviceId = localStorage.getItem("device_id");
  const handleLikePhoto = async (photoId) => {
    try {
      const response = await axios.put(
        `${API}/api/auth/photos/${photoId}/like`,
        {
          browserId: storedDeviceId,
        }
      );

      if (response.status === 200) {
        // Update likedPhotos
        setLikedPhotos((prevLikedPhotos) => [...prevLikedPhotos, photoId]);
        console.log("Liked");
      }
    } catch (error) {
      console.error("");
    }
  };

  return (
    <>
      <TopNav routeLink={"/image_hub"} barTitle={getLists.collectionName}>
        {/* DISPLAY COLLECTIONS LISTS START*/}
        <div className="relative w-full overflow-y-scroll mt-1">
          <div className="grid grid-cols-6 sm:grid-cols-2 p-2 gap-3 w-full h-fit rounded-xl overflow-hidden">
            {getLists?.photos?.map((x) => (
              <div
                key={x._id}
                className="flex-wrap relative flex items-center justify-center flex-col"
              >
                {/* Display the photo */}
                <img
                  className="border border-gray-300 hover:shadow-md w-full h-[150px] sm:h-[130px] rounded-sm overflow-hidden object-contain cursor-pointer"
                  src={x.url}
                  alt={x.name}
                  onClick={() => handleImageModel(x)}
                />
                {/* Display the like button and count */}
                <div className="absolute bottom-1 left-1 flex items-center w-full">
                  {/* Display the like button */}
                  <button
                    className="flex items-center justify-evenly w-10 h-6 rounded-full bg-white hover:bg-gray-200 focus:outline-none"
                    onClick={() => handleLikePhoto(x._id)}
                    disabled={likedPhotos.includes(x._id)}
                  >
                    <span className="text-red-500 active:scale-95 text-[11px]">
                      {likedPhotos.includes(x._id) ? "❤️" : "🤍"}
                    </span>
                    <p className="text-sm text-gray-600">{x.likeCount}</p>
                  </button>
                  {/* Display the like count */}
                </div>
              </div>
            ))}
          </div>
          {/* Image Popup Model */}
          {selectedImage && (
            <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full sm:w-full sm:h-full rounded-md flex items-center justify-center bg-black bg-opacity-60">
              <div className="relative max-w-3xl max-h-full w-full h-auto">
                <img
                  className="object-contain w-full h-[400px] sm:max-h-[380px]"
                  src={selectedImage.url}
                  alt={selectedImage.name}
                />
                <button
                  className="active:scale-95 absolute p-1 bg-red-400 text-white rounded-full -top-7 right-2 font-medium"
                  onClick={() => setSelectedImage(null)}
                >
                  <RxCross1 size={12} />
                </button>
              </div>
            </div>
          )}
        </div>
        {/* DISPLAY COLLECTIONS LISTS END*/}
      </TopNav>
    </>
  );
};

export default ImageLists;
