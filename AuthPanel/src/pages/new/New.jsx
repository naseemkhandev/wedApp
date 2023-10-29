import "./new.scss";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BASE_URL from "../../components/BASE_URL";

const New = ({ title }) => {
  const [guestName, setName] = useState("");
  const [guestEmail, setEmail] = useState("");
  const [inviteType, setInviteType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleGuestName = (e) => {
    setName(e.target.value);
  };
  const handleGuestEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleInviteType = (event) => {
    setInviteType(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginId = localStorage.getItem("authId");
    const formData = new FormData();
    formData.append("loginId", loginId);
    formData.append("guestName", guestName);
    formData.append("guestEmail", guestEmail);
    formData.append("inviteType", inviteType);

    try {
      const response = await axios.post(`${BASE_URL}/api/adduser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "X-Requested-With",
        },
      });
      // console.log("Data saved successfully", response.data);
      setShowAlert(true);
      setName("");
      setEmail("");
      setInviteType("");
      navigate("/users");
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      setErrorMessage("Error saving data");
    }
  };
  return (
    <>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <form id="form" onSubmit={handleSubmit}>
              {showAlert && (
                <Alert
                  severity={errorMessage ? "error" : "success"}
                  onClose={() => setShowAlert(false)}
                >
                  {errorMessage ? errorMessage : "Data saved successfully"}
                </Alert>
              )}
              <div className="form-group">
                <label htmlFor="guestName">Guest Name:</label>

                <input
                  type="text"
                  className="textLayout"
                  placeholder="guest Name"
                  id="guestName"
                  value={guestName}
                  onChange={handleGuestName}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="guestEmail">Email:</label>
                <input
                  type="email"
                  id="guestEmail"
                  value={guestEmail}
                  onChange={handleGuestEmail}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="inviteTypeSelect">Invite type:</label>
                <select
                  id="inviteTypeSelect"
                  value={inviteType}
                  onChange={handleInviteType}
                  required
                >
                  <option value="">-- Select an invite type --</option>
                  <option value="general">General</option>
                  <option value="close">Close</option>
                </select>
              </div>
              <div>
                <div className="form-group">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btnSolid"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default New;
