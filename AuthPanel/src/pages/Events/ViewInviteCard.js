import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalInvite from "./ModalInvite";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import BASE_URL from "../../components/BASE_URL";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { API } from "../../utils/URL";

const ViewInviteCard = () => {
  const [inviteCards, setInviteCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginId = localStorage.getItem("authId");
        const response = await axios.get(
          `${BASE_URL}/api/auth/get-invite-cards?authId=${loginId}`
        );
        setInviteCards(response.data.inviteCards);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/auth/delete-invite-card/${id}`);
      setInviteCards((prevCollections) =>
        prevCollections.filter((c) => c._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="newContainer ml-2">
          <div className="top">
            <h3>View Invites</h3>
          </div>
          <div className="subList">
            <ModalInvite isOpen={isModalOpen} onClose={handleCloseModal} />
            <span>
              &nbsp;
              <AddCircleOutlineOutlinedIcon
                fontSize="25px"
                color="#6439ff"
                onClick={handleOpenModal}
              />
            </span>
            <span>&nbsp; Add Invite Card</span>
          </div>
          <div className="imagecollection">
            <div className="bottom">
              <div className="row">
                <div>
                  <h1 className="text-xl font-semibold mb-4 p-2">
                    Invite Cards List
                  </h1>
                  {inviteCards.length === 0 ? (
                    <p className="text-gray-600">No invite cards available.</p>
                  ) : (
                    inviteCards.map((inviteCard) => (
                      <div
                        key={inviteCard._id}
                        className="border rounded p-4 m-2"
                      >
                        <h2 className="text-xl font-semibold mb-2">
                          Invite Name: {inviteCard.inviteCardName}
                        </h2>
                        <p className="text-gray-700">
                          Invite Type: {inviteCard.inviteType}
                        </p>
                        <p className="text-blue-600">
                          PDF URL:{" "}
                          <a
                            href={inviteCard.pdf.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {inviteCard.pdf.name}
                          </a>
                        </p>

                        {/* Add a download link for the PDF */}
                        <a
                          href={`${inviteCard.pdf.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600"
                        >
                          Download PDF
                        </a>

                        <div className="flex mt-4">
                          <button
                            onClick={() => handleDelete(inviteCard._id)}
                            className="flex items-center px-3 py-2 text-red-600 hover:text-red-800"
                          >
                            <DeleteOutlineOutlinedIcon className="h-5 w-5"></DeleteOutlineOutlinedIcon>
                            <span className="ml-1">Delete</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInviteCard;
