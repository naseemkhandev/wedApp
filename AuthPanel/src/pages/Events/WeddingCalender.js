import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalEvent from "./ModalEvent";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import BASE_URL from "../../components/BASE_URL"
const WeddingCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginId = localStorage.getItem("authId");
        const response = await axios.get(
          ` ${BASE_URL}/api/auth/get-events?authId=${loginId}`
        );
        const data = response.data;
        if (data.calendar && data.calendar.length > 0) {
          const events = data.calendar[0].events || [];
          setEvents(events);
        } else {
          setEvents([]);
        }
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

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="newContainer ml-2">
          <div className="top">
            <h3>View Event List </h3>
          </div>
          <div className="subList">
            <ModalEvent isOpen={isModalOpen} onClose={handleCloseModal} />
            <span>
              &nbsp;
              <AddCircleOutlineOutlinedIcon
                fontSize="25px"
                color="#6439ff"
                onClick={handleOpenModal}
              />
            </span>
            <span>&nbsp; Create Events</span>
          </div>

          <div className="imagecollection">
            <div className="bottom">
              <div className="row">
                <h3>Events List</h3>
                <hr></hr>

                {events.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Invite Type
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {events.map((event) => (
                        <tr key={event._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {event.eventName}
                          </td>
                          <td className="px-6 w-[300px] flex items-center flex-wrap py-4 ">
                            <span>{event.eventLocation}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {event.eventDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {event.eventTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {event.inviteType}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No events available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingCalendar;
