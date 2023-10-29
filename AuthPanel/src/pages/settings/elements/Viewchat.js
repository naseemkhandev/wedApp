import "../settings/Style.scss";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import BASE_URL from "../../../components/BASE_URL";

const ViewChats = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginId = localStorage.getItem("authId");
        const response = await axios.get(
          `${BASE_URL}/api/auth/chatdetails?authId=${loginId}`
        );
        const data = response.data.details;
        setCollections(data);
        // console.log(collections);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  },[]);

  return (
    <>
      <Sidebar />
      <div className="home">
        <Navbar />
        {/* Display the tabs based on the order */}
        {collections.map(collection => (
          <div key={collection._id} className="tab">
            <h2>Tab {collection.order}</h2>
            {/* Display photos */}
            {collection.photos && collection.photos.map(photo => (
              <img
                key={photo._id}
                src={photo.url}
                alt={photo.name}
                className="photo"
              />
            ))}
            {/* Display messages */}
            {collection.messages && collection.messages.map(message => (
              <p key={message._id} className="message">{message.text}</p>
            ))}
            {/* Display options */}
            {collection.options && collection.options.map(option => (
              <button key={option._id} className="option">{option.name}</button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewChats;