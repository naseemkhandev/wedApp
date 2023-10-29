import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Alert } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import BASE_URL from "../../components/BASE_URL";
const ModalEvent = ({ isOpen, onClose }) => {
  const [eventName, seteventName] = useState("");
  const [eventDate, seteventDate] = useState("");
  const [eventTime, seteventTime] = useState("");
  const [eventLocation, seteventLocation] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inviteType, setInviteType] = useState("");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
    },
  };
  const handleventName = (event) => {
    seteventName(event.target.value);
  };
  const handleventDate = (event) => {
    seteventDate(event.target.value);
  };
  const handleventTime = (event) => {
    seteventTime(event.target.value);
  };
  const handleventLocation = (event) => {
    seteventLocation(event.target.value);
  };
  const handleInviteType = (event) => {
    setInviteType(event.target.value);
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const authId = localStorage.getItem("authId");
    formData.append("authId", authId);
    formData.append("eventName", eventName);
    formData.append("eventDate", eventDate);
    formData.append("eventTime", eventTime);
    formData.append("eventLocation", eventLocation);
    formData.append("inviteType", inviteType);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/events`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
          },
        }
      );

      // console.log("Data saved successfully", response.data);
      setShowAlert(true);
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
        contentLabel="Image Upload Modal"
      >
        <button onClick={handleCloseModal} className="closeIcon">
          <CloseOutlinedIcon></CloseOutlinedIcon>
        </button>
        <h4> Add Event Details</h4>
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
          <input
            name="eventName"
            placeholder="Event Name"
            className="textLayout m-2"
            value={eventName}
            onChange={(event) => handleventName(event)}
          />
          <input
            name="eventLocation"
            className="textLayout m-2"
            placeholder="Venue"
            value={eventLocation}
            onChange={(event) => handleventLocation(event)}
          />

          <input
            name="eventDate"
            type="date"
            className="textLayout m-2"
            fullWidth
            value={eventDate}
            onChange={(event) => handleventDate(event)}
          />
          <input
            name="eventTime"
            type="time"
            className="textLayout m-2"
            fullWidth
            value={eventTime}
            onChange={(event) => handleventTime(event)}
          />

          <div className="form-group">
            <label htmlFor="inviteTypeSelect">Invite type:</label>
            <select
              id="inviteTypeSelect"
              value={inviteType}
              onChange={handleInviteType}
              className="formcontrol"
              required
            >
              <option value="">-- Select an invite type --</option>
              <option value="general">General</option>
              <option value="close">Close</option>
            </select>
          </div>
          <br />
          <button type="submit" onClick={handleSubmit} className="btnSolid">
            Add Event
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ModalEvent;
