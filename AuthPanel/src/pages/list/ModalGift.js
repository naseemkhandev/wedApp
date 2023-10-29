import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Alert } from "@mui/material";
import BASE_URL from "../../components/BASE_URL";
import { API } from "../../utils/URL";

const ModalGift = ({ isOpen, onClose }) => {
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
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [items, setItems] = useState("");
  const [giftUser, setgiftUser] = useState("");

  const handleCloseModal = () => {
    onClose();
  };

  const handleInputChange = (e) => {
    setItems(e.target.value);
  };

  const handlegiftUserChange = (e) => {
    setgiftUser(e.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const authId = localStorage.getItem("authId");
    formData.append("giftName", items);
    formData.append("userName", giftUser);
    formData.append("authId", authId);

    // Construct the full URL
    const apiUrl = `${API}/api/auth/giftlists`;

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log('Added Gift Item successfully in Gift Registry', response.data);
      setShowAlert(true);
      setItems("");
      setgiftUser("");
      onClose()
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
        contentLabel="Gift Modal"
      >
        <button onClick={handleCloseModal} className="closeIcon">
          <CloseOutlinedIcon />
        </button>
        <h4> Create List </h4>
        <hr />
        <form className="PaddingCustom">
          {/* {showAlert && (
            <Alert severity={errorMessage ? 'error' : 'success'} onClose={() => setShowAlert(false)}>
              {errorMessage ? errorMessage : 'Added Gift Item successfully in Gift Registry'}
            </Alert>
          } */}

          <input
            type="text"
            value={items}
            onChange={handleInputChange}
            placeholder="Add Gift Item here"
            className="textLayout"
          />
          <br></br>
          <input
            type="text"
            value={giftUser}
            onChange={handlegiftUserChange}
            placeholder="Gifted By"
            className="textLayout"
          />
          <button type="submit" onClick={handleSubmit} className="btnSolid">
            Add
          </button>
          <br />
          <br />
        </form>
      </Modal>
    </>
  );
};

export default ModalGift;
