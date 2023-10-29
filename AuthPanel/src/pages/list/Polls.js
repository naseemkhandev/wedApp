import React, { useState, useEffect } from "react";
import "./list.scss";
import ModaPolls from "../list/ModaPolls";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import axios from "axios";
import BASE_URL from "../../components/BASE_URL"
const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginId = localStorage.getItem('authId');
        // console.log(loginId);
        const response = await axios.get(`${BASE_URL}/api/auth/get-polls?authId=${loginId}`);
        const data = response.data;
        setPolls(data || []);
      } catch (error) {
        console.error(error);
        // Handle error case
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

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="newContainer ml-2">
            <div className="top">
              <h3>Polls</h3>
            </div>
            <div className="subList">
              <ModaPolls isOpen={isModalOpen} onClose={handleCloseModal} />
              <span>&nbsp;<AddCircleOutlineOutlinedIcon fontSize="25px" color="#6439ff" onClick={handleOpenModal} /></span>
              <span>&nbsp; Create Poll</span>
            </div>
            <div className="imagecollection">
              <div className="bottom">
                <div className="row">
                  <h3>Polls Collection</h3>

                  {polls.length > 0 ? (
                    polls.map((poll) => (
                      <div key={poll._id} className="ml-2 pb-4">
                        <div className="pb-1"><strong>{poll.question}</strong></div>
                        <hr></hr>
                        {poll.options.map((option) => {
                          const totalCount = poll.options.reduce((sum, option) => sum + option.count, 0);

                          return (
                            <div key={option._id}>
                              <p className="flex justify-around pt-2">
                                <span>{option.text}</span>
                                <span>
                                <strong>{Math.ceil((option.count / totalCount) * 100)}% </strong>
                                </span>
                              </p>

                              <div className="w-full h-4 bg-gray-200 rounded">
                                <div
                                  className="h-full bg-indigo-600 rounded"
                                  style={{ width: `${(option.count / totalCount) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))
                  ) : (
                    <p>No polls available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Polls;
