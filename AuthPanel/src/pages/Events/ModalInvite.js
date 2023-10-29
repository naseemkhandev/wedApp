import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Alert } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import BASE_URL from "../../components/BASE_URL"
const ModalInvite = ({ isOpen, onClose }) => {
  const [inviteCardName, setInviteName] = useState("");
  const [inviteType, setInviteType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
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
  const handlInviteName = (event) => {
    setInviteName(event.target.value);
  };
 
  const handleInviteType = (event) => {
    setInviteType(event.target.value);
  };

  const handleCloseModal = () => {
    onClose();
  };
  const handlePdfFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const authId = localStorage.getItem("authId");
    formData.append("authId", authId);
    formData.append("inviteCardName",inviteCardName);
     formData.append("inviteType", inviteType);
     formData.append("pdf", pdfFile);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/invite-card`,
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
        contentLabel="Image Upload Modal"
      >
        <button onClick={handleCloseModal} className="closeIcon">
          <CloseOutlinedIcon></CloseOutlinedIcon>
        </button>
        <h4> Add Invitation Card Details</h4>
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
            name="InviteName"
            placeholder="Name"
            className="textLayout m-2"
            value={inviteCardName}
            onChange={(event) => handlInviteName(event)}
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
          <div>
            <label htmlFor="pdfFileInput">Upload PDF File:</label>
            <input
              type="file"
              id="pdfFileInput"
              accept=".pdf"
              onChange={handlePdfFileChange}
              required
            />
          </div>
          <br></br>
          <button type="submit" onClick={handleSubmit} className="btnSolid">
            Add Event
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ModalInvite;
