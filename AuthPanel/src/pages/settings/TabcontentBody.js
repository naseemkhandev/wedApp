import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import axios from "axios";
import {
  CenterFocusStrongOutlined as CenterFocusStrongOutlinedIcon,
  VideoCallOutlined as VideoCallOutlinedIcon,
  NavigationOutlined as NavigationOutlinedIcon,
  ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon
} from "@mui/icons-material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Options from "./elements/Options";
import LocationMap from "./elements/LocationMap";
import ImagesInput from "./elements/ImagesInput";
import VideoInput from "./elements/VideoInput";
import Messages from "./elements/Messages";
import BASE_URL from "../../components/BASE_URL";

const TabcontentBody = ({ activeTab, totalTabs, chatId, chatTitle }) => {
  const [optionValues, setOptionValues] = useState([]);
  const [locationValues, setLocationValues] = useState([]);
  const [ImagesValues, setImagesValues] = useState([]);
  const [VideosValues, setVideosValues] = useState([]);
  const [MessagesValues, setMessagesValues] = useState([]);
  const [sequence, setSequence] = useState(0);
  const [elements, setElements] = useState([]);
  const [messageboxprops, setmessageprops] = useState([]);
  const [locationprops, setlocationprops] = useState([]);
  const [imagesprops, setimagesprops] = useState([]);
  const [videosprops, setvideosprops] = useState([]);
  const [optionsprops, setoptionsprops] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentTab, setCurrentTab] = useState(activeTab);
  useEffect(() => {
    console.log("elements updated: ", elements);
  }, [elements]);
  const handleAddElement = (elementType, populateFunction) => {
    setElements((prevElements) => [...prevElements, elementType]);
    populateFunction();
  };
  const removeElement = (elementType, index) => {
    setElements((prevElements) => {
      const updatedElements = [...prevElements];
      updatedElements.splice(index, 1);
      return updatedElements;
    });
  };

  const handleOptionPopulate = () => {
    setOptionValues((prevOptionValues) => [
      ...prevOptionValues,
      {
        id: Date.now(),
        question: "",
        rows: [
          
        ]
      }
    ]);
  };

  const handleLocationPopulate = () => {
    setLocationValues((prevLocationValues) => [
      ...prevLocationValues,
      { id: Date.now(), value: "" }
    ]);
  };

  const handleMessagesPopulate = () => {
    setMessagesValues((prevMessagesValues) => [
      ...prevMessagesValues,
      { id: Date.now(), value: "" }
    ]);
  };

  const handleImagesPopulate = (acceptedFiles) => {
    setImagesValues((prevImagesValues) => [
      ...prevImagesValues,
      { id: Date.now(), files: acceptedFiles }
    ]);
  };

  const handleVideosPopulate = (acceptedFiles) => {
    setVideosValues((prevVideosValues) => [
      ...prevVideosValues,
      { id: Date.now(), files: acceptedFiles }
    ]);
  };

  const handleOptionChange = (updatedValue1, updatedValue2, index) => {
    setOptionValues((prevOptionValues) => {
      const updatedOptions = [...prevOptionValues];
      updatedOptions[index] = {
        getvalue: updatedValue1,
        Elementpriority: updatedValue2,
      };
      return updatedOptions;
    });
  };
  

  const handleRowAdd = (optionIndex) => {
    setOptionValues((prevOptionValues) => {
      return prevOptionValues.map((option, index) => {
        if (index === optionIndex) {
          return {
            ...option,
            rows: [...option.rows, { answer: "", moveOn: "" }]
          };
        }
        return option;
      });
    });
  };
  

  const handleRowRemove = (optionIndex, rowIndex) => {
    setOptionValues((prevOptionValues) => {
      return prevOptionValues.map((option, index) => {
        if (index === optionIndex) {
          return {
            ...option,
            rows: option.rows.filter((_, i) => i !== rowIndex)
          };
        }
        return option;
      });
    });
  };
  

  const handleOptionRemove = (id) => {
    setOptionValues((prevOptionBoxes) => {
      const updatedOptionBoxes = [...prevOptionBoxes];
      updatedOptionBoxes.splice(id, 1);
      return updatedOptionBoxes;
    });
    removeElement("options", id);
  };

  const handleLocationRemove = (id) => {
    setLocationValues((prev) => {
      const updatedLoc = [...prev];
      updatedLoc.splice(id, 1);
      return updatedLoc;
    });
    removeElement("location", id);
  };

  const handleImagesRemove = (id) => {
    setImagesValues((prev) => {
      const updatedFiles = [...prev];
      updatedFiles.splice(id, 1);
      return updatedFiles;
    });
    removeElement("images", id);
  };

  const handleVideosRemove = (id) => {
    setVideosValues((prev) => {
      const updatedFiles = [...prev];
      updatedFiles.splice(id, 1);
      return updatedFiles;
    });
    removeElement("videos", id);
  };

  const handleMessageRemove = (id) => {
    setMessagesValues((prev) => {
      const updatedMessage = [...prev];
      updatedMessage.splice(id, 1);
      return updatedMessage;
    });
    removeElement("messages", id);
  };

  const handleMessageChange = (updatedValue1, updatedValue2, index) => {
    setMessagesValues((prevMessagesValues) => {
      const updatedMessages = [...prevMessagesValues];
      updatedMessages[index] = {
        getvalue: updatedValue1,
        Elementpriority: updatedValue2,
      };
      return updatedMessages;
    });
  };
  
  const handleImagesChange = (updatedFiles, index) => {
    setImagesValues((prevImagesValues) => {
      const updatedImages = [...prevImagesValues];
      updatedImages[index] = {
        getfiles: updatedFiles.map((file) => ({
          url: file,
          size: file.size,
          priority: file.countNumber
        }))
      };
      return updatedImages;
    });
  };
  

  const handleVideoChange = (updatedFiles, index) => {
    setVideosValues((prevVideosValues) => {
      const updatedVideos = [...prevVideosValues];
      updatedVideos[index] = {
        getfiles: updatedFiles.map((file) => ({
          url: file,
          size: file.size,
          priority: file.countNumber
        }))
      };
      return updatedVideos;
    });
  };
  
  const handleLocationChange = (updatedValue1, updatedValue2, index) => {
    setlocationprops((prev) => {
      const updatedLocations = [...prev];
      updatedLocations[index] = {
        getvalue: updatedValue1,
        Elementpriority: updatedValue2,
      };
      return updatedLocations;
    });
  };
  

  const handleOptionRowChange = (updatedValue, optionIndex, rowIndex) => {
    setOptionValues((prevOptionValues) => {
      return prevOptionValues.map((option, index) => {
        if (index === optionIndex) {
          const updatedRows = [...option.rows];
          updatedRows[rowIndex].answer = updatedValue;
  
          return {
            ...option,
            rows: updatedRows,
          };
        }
        return option;
      });
    });
  };
  

  const alllElements = [
    {
      key: "options",
      component: Options,
      optionValues: optionValues,
      setOptionValue: setOptionValues,
      values: optionValues,
      onChange: handleOptionChange,
      onRemove: handleOptionRemove,
      onRowAdd: handleRowAdd,
      onRowRemove: handleRowRemove,
      handleOptionRowChange: handleOptionRowChange
      // sequence: sequence
    },
    {
      key: "location",
      component: LocationMap,
      values: locationValues,
      onChange: handleLocationChange,
      onRemove: handleLocationRemove
      // sequence: sequence
    },
    {
      key: "images",
      component: ImagesInput,
      values: ImagesValues,
      onChange: handleImagesChange,
      onRemove: handleImagesRemove
      // sequence: sequence
    },
    {
      key: "videos",
      component: VideoInput,
      values: VideosValues,
      onChange: handleVideoChange,
      onRemove: handleVideosRemove
      // sequence: sequence
    },
    {
      key: "messages",
      component: Messages,
      values: MessagesValues,
      onChange: handleMessageChange,
      onRemove: handleMessageRemove
      // sequence: sequence
    }
  ];



  const handleNextTab = () => {
    const nextTab = currentTab + 1;
    setCurrentTab(activeTab + 1);
  };

  // Log the current state to debug
  console.log("optionValues", optionValues);
  console.log("locationValues", locationValues);
  console.log("ImagesValues", ImagesValues);
  console.log("VideosValues", VideosValues);
  console.log("MessagesValues", MessagesValues);

  const handleSubmit = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const formData = new FormData();
      const authId = await localStorage.getItem("authId");
      console.log(authId)
      const messagesArr = MessagesValues.map((field) => ({
        text: field.getvalue,
        priority: field.Elementpriority
      }));

      const LocationArr = locationValues.map((field) => ({
        url: field.getvalue,
        priority: field.Elementpriority
      }));

      if (imagesprops.length > 0) {
        const uploadImageFormData = new FormData();
        imagesprops.map((field) =>
          field.getfiles.map((file) => {
            uploadImageFormData.append("photos", file.url);
          })
        );

        const imageResponse = await axios.post(
          `${BASE_URL}/api/auth/chatdetails/upload/resources`,
          uploadImageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        const images = ImagesValues.flatMap((field) =>
          field.getfiles.map((file, index) => ({
            url: imageResponse.data[index]["url"],
            priority: file.priority + 1,
            size: file.size
          }))
        );
        formData.append("photos", JSON.stringify(images));
      } else {
        formData.append("photos", JSON.stringify([]));
      }

      if (videosprops.length > 0) {
        const uploadVideoFormData = new FormData();
        videosprops.flatMap((field) =>
          field.getfiles.map((file) => {
            uploadVideoFormData.append("videos", file.url);
          })
        );
        const videoResponse = await axios.post(
          `${BASE_URL}/api/auth/chatdetails/upload/resources`,
          uploadVideoFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "X-Requested-With"
            }
          }
        );

        const videos = VideosValues.flatMap((field) =>
          field.getfiles.map((file, index) => ({
            url: videoResponse.data[index]["url"],
            priority: file.priority + 1,
            size: file.size
          }))
        );
        formData.append("videos", JSON.stringify(videos));
      } else {
        formData.append("videos", JSON.stringify([]));
      }

      const options = optionValues.map((field) => ({
        ...field,
        priority: field.Elementpriority
      }));

      formData.append("messages", JSON.stringify(messagesArr));
      formData.append("location", JSON.stringify(LocationArr));
      formData.append("options", JSON.stringify(options));
      formData.append("authId", JSON.stringify(authId));
      formData.append("order", JSON.stringify(activeTab));
      formData.append("chatTitle", JSON.stringify(chatTitle));
      formData.append("chatId", JSON.stringify(chatId));

      const response = await axios.post(
        `${BASE_URL}/api/auth/chatdetails`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
          }
        }
      );

      console.log("Data saved successfully in step:", activeTab, response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      handleNextTab();
    }
  };

  return (
    <>
      <div className="p-4 border rounded-md">
        Add elements:
        <Tooltip
          title="Text Message"
          placement="top"
          className="px-1"
          onClick={() => {
            handleAddElement("messages", handleMessagesPopulate);
          }}
        >
          <EmailOutlinedIcon />
        </Tooltip>
        <Tooltip
          title="Image"
          placement="top"
          className="px-1"
          onClick={() => {
            handleAddElement("images", () => handleImagesPopulate([]));
          }}
        >
          <CenterFocusStrongOutlinedIcon />
        </Tooltip>
        <Tooltip
          title="Video"
          placement="top"
          className="px-1"
          onClick={() => {
            handleAddElement("videos", () => handleVideosPopulate([]));
          }}
        >
          <VideoCallOutlinedIcon />
        </Tooltip>
        <Tooltip
          title="Google link"
          placement="top"
          className="px-1"
          onClick={() => {
            handleAddElement("location", handleLocationPopulate);
          }}
        >
          <NavigationOutlinedIcon />
        </Tooltip>
        <Tooltip
          title="User Options"
          placement="top"
          className="px-1"
          onClick={() => {
            handleAddElement("options", handleOptionPopulate);
          }}
        >
          <ChatBubbleOutlineOutlinedIcon />
        </Tooltip>
      </div>
      {elements.map((elementType, index) => {
        let elementIndex = null;
        let element = alllElements.find((el) => el.key === elementType);
        let elementValueIndex = elements
          .slice(0, index)
          .filter((el) => el === elementType).length;

        if (!element || elementValueIndex >= element.values.length) return null;

        return (
          <div key={index}>
            <element.component
              key={elementValueIndex}
              index={elementValueIndex}
              value={element.values[elementValueIndex]}
              optionValues={optionValues}
              setOptionValue={element.setOptionValue}
              onChange={element.onChange}
              handleOptionRowChange={element.handleOptionRowChange}
              onRemove={element.onRemove}
              onRowAdd={element.onRowAdd}
              onRowRemove={element.onRowRemove}
            />
          </div>
        );
      }).reverse()}

      <button
        type="submit"
        className="p-2 mt-4 text-white bg-purple-700"
        id={currentTab}
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </>
  );
};

export default TabcontentBody;
