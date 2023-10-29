import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { TextField, Button, IconButton } from "@material-ui/core";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Alert } from "@mui/material";
import BASE_URL from "../../components/BASE_URL";

const ModalLayout = ({ isOpen, onClose }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [inviteType, setInviteType] = useState("");
  const [inputFields, setInputFields] = useState([{ message: "" }]);

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

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].message = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ message: "" });
    setInputFields(values);
  };

  const handlesetQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleInviteType = (event) => {
    setInviteType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const authId = localStorage.getItem("authId");
    formData.append("question", question);
    formData.append("authId", authId);
    formData.append("inviteType", inviteType);

    inputFields.forEach((field, index) => {
      formData.append("options", field.message); // Append each option individually
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/polls`,
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
      setQuestion("");
      setInputFields([{ message: "" }]);
      setInviteType("");
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
        <h4> Add Poll Details</h4>
        <hr></hr>
        <form className="PaddingCustom">
          {showAlert && (
            <Alert
              severity={errorMessage ? "error" : "success"}
              onClose={() => setShowAlert(false)}
            >
              {errorMessage ? errorMessage : "Data saved successfully"}
            </Alert>)
          }
          <div>
            <input
              type="text"
              onChange={handlesetQuestion}
              value={question}
              className="textLayout"
              placeholder="Question"
            />
          </div>
          <div>
            {inputFields.map((inputField, index) => (
              <div key={index}>
                <TextField
                  label={`Option ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={inputField.message}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <IconButton onClick={() => handleRemoveFields(index)}>
                  <RemoveCircle />
                </IconButton>
              </div>
            ))}

            <Button onClick={handleAddFields} startIcon={<AddCircle />}>
              Add options
            </Button>
          </div>
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
            Create Poll
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ModalLayout;
