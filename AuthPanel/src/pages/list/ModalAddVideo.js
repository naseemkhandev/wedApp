import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Dropzone from "react-dropzone";
import { Alert, CircularProgress } from "@mui/material"; // Added CircularProgress for loading indicator
import BASE_URL from "../../components/BASE_URL";

const ModalAddVideo = ({ isOpen, onClose, selectedCollectionId }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleCloseModal = () => {
    onClose();
  };

  const onDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (files.length === 0) {
      setErrorMessage("Please select files to upload");
      setShowAlert(true);
      return;
    }

    const formData = new FormData();

    const authId = localStorage.getItem("authId");

    if (authId) {
      formData.append("authId", authId);
    }

    formData.append("collectionId", selectedCollectionId);

    for (let i = 0; i < files.length; i++) {
      formData.append("videos", files[i]);
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/auth/add-video-more`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("Data saved successfully", response.data);
      setShowAlert(true);
      setLoading(false);
      onClose()
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      setErrorMessage("Error saving data");
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Image Upload Modal"
        ariaHideApp={false}
      >
        <button onClick={handleCloseModal} className="closeIcon">
          <CloseOutlinedIcon />
        </button>
        <h4>Add More Videos</h4>
        <hr />
        <form className="PaddingCustom">
          {showAlert && (
            <Alert
              severity={errorMessage ? "error" : "success"}
              onClose={() => setShowAlert(false)}
            >
              {errorMessage ? errorMessage : "Data saved successfully"}
            </Alert>
          )}
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
              </div>
            )}
          </Dropzone>
          {files.map((file, index) => (
            <div key={file.name}>
              <video
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={50}
                height={50}
              />
              <button className="closeBtn" onClick={() => removeFile(index)}>
                x
              </button>
            </div>
          ))}
          <br />
          <button type="submit" onClick={handleSubmit} className="btnSolid">
            Save
          </button>
          {loading && <CircularProgress />} {/* Show loading indicator */}
        </form>
      </Modal>
    </>
  );
};

export default ModalAddVideo;
