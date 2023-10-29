import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Dropzone from "react-dropzone";
import { Alert } from "@mui/material";
import BASE_URL from "../../components/BASE_URL";

const ModalLayout = ({ isOpen, onClose, addCollection, fetchCollections }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [files, setFiles] = useState([]);
  const [inviteType, setInviteType] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

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

  const handleCollectionNameChange = (e) => {
    setCollectionName(e.target.value);
  };

  const handleInviteType = (event) => {
    setInviteType(event.target.value);
  };

  const handleCloseModal = () => {
    onClose();
  };

  const onDrop = (acceptedFiles) => {
    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
    const filteredFiles = acceptedFiles.filter((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      return allowedExtensions.includes(fileExtension);
    });

    setFiles([...files, ...filteredFiles]);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const authId = localStorage.getItem("authId");
    formData.append("collectionName", collectionName);
    formData.append("authId", authId);
    formData.append("inviteType", inviteType);
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/add-collection`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setShowAlert(true);
      addCollection(response.data.newCollection);
      onClose();

      // Call the fetchCollections function passed as a prop
      fetchCollections();
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      setErrorMessage("Error saving data");
    } finally {
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
      >
        <button onClick={handleCloseModal} className="closeIcon">
          <CloseOutlinedIcon />
        </button>
        <h4>Add Collection Details</h4>
        <hr></hr>
        <form className="PaddingCustom">
          {showAlert && (
            <Alert
              severity={errorMessage ? "error" : "success"}
              onClose={() => setShowAlert(false)}
            >
              {errorMessage ? errorMessage : "Data saved successfully"}
            </Alert>
          )}
          <label>
            Collection Name:
            <input
              type="text"
              value={collectionName}
              onChange={handleCollectionNameChange}
              className="textLayout"
            />
          </label>

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
              <img
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
          <div className="form-group">
            <label htmlFor="inviteTypeSelect">Invite type:</label>
            <select
              id="inviteTypeSelect"
              value={inviteType}
              onChange={handleInviteType}
              className="textLayout"
              required
            >
              <option value="">-- Select an invite type --</option>
              <option value="general">General</option>
              <option value="close">Close</option>
            </select>
          </div>
          <br />
          <button type="submit" onClick={handleSubmit} className="btnSolid">
            {loading ? "Uploading..." : "Save"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ModalLayout;
