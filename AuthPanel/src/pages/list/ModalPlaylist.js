import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import Dropzone from "react-dropzone";
import BASE_URL from "../../components/BASE_URL"
import { Alert } from "@mui/material";
const ModalPlaylist = ({ isOpen, onClose }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [playListName, setPlayListName] = useState("");
  const [playListUrl, setPlayListUrl] = useState("");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "30%",
    },
  };

  const handleCloseModal = () => {
    onClose();
  };
  const loginId = localStorage.getItem("authId");
  // console.log(loginId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const authId = localStorage.getItem("authId");
    formData.append("playListName", playListName);
    formData.append("authId", authId);
    formData.append("playListUrl", playListUrl);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/playlists`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
          },
        }
      );

      // console.log("Added Video Collection successfully", response.data);
      setShowAlert(true);
      setPlayListName("");
      setPlayListUrl("");
      onClose();
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      setErrorMessage("Error saving data");
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="PlayList Modal"
      >
        <button onClick={handleCloseModal} className="closeIcon">
          <CloseOutlinedIcon></CloseOutlinedIcon>
        </button>
        <h4>Add PlayList </h4>
        <hr></hr>
        <form className="PaddingCustom">
          {showAlert && (
            <Alert
              severity={errorMessage ? "error" : "success"}
              onClose={() => setShowAlert(false)}
            >
              {errorMessage
                ? errorMessage
                : "Added Video Collection successfully"}
            </Alert>
          )}

          <input
            type="text"
            value={playListName}
            onChange={(e) => setPlayListName(e.target.value)}
            className="textLayout"
            placeholder="Playlist Name"
            required
          />

          <input
            type="text"
            value={playListUrl}
            onChange={(e) => setPlayListUrl(e.target.value)}
            className="textLayout"
            placeholder="Playlist URL"
            required
          />

          <br />
          <button type="submit" onClick={handleSubmit} className="btnSolid">
            Save
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ModalPlaylist;
