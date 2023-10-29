import "./widget.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CropOriginalOutlinedIcon from "@mui/icons-material/CropOriginalOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import SwitchVideoOutlinedIcon from "@mui/icons-material/SwitchVideoOutlined";

import BASE_URL from "../../components/BASE_URL";

import axios from "axios";
const Widget = ({ type }) => {

  
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  // Update the switch statement to assign the correct data based on the type
  let data;
  switch (type) {
    case "images":
      data = {
        title: "Uploaded Images",
        link: "See all Images",
        url: "/images",
        icon: (
          <CropOriginalOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        value:
          collections.find((item) => item.name === "photoCount")?.value || 0,
      };
      break;
    case "videos":
      data = {
        title: "Videos",
        link: "Total Videos",
        url: "/Videos",
        icon: (
          <SwitchVideoOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        value:
          collections.find((item) => item.name === "videoCount")?.value || 0,
      };
      break;
    case "polls":
      data = {
        title: "Polls",
        link: "Total Polls",
        url: "/polls",
        icon: (
          <PollOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
        value:
          collections.find((item) => item.name === "pollCount")?.value || 0,
      };
      break;
    case "giftlist":
      data = {
        title: "Giftlist",

        link: "See details",
        url: "/GiftRegistry",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
        value:
          collections.find((item) => item.name === "giftCount")?.value || 0,
      };
      break;
    case "invitees":
      data = {
        title: "Invitees",

        link: "See details",
        url: "/users",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
        value:
          collections.find((item) => item.name === "userCount")?.value || 0,
      };
      break;
    case "playlist":
      data = {
        title: "PlayList",

        link: "See details",
        url: "/playlist",
        icon: (
          <QueueMusicIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
        value: collections.find((item) => item.name === "musicPlaylistCount")
          ?.value,
      };
      break;
    default:
      data = {
        title: "Unknown Type",
        link: "Unknown Link",
        icon: null, // or provide a default icon
      };
      break;
  }

  useEffect(() => {
    let isMounted = true; // Add an isMounted flag

    const fetchData = async () => {
      try {
        const loginId = localStorage.getItem("authId");
        console.log(loginId);
        const response = await axios.get(
          `${BASE_URL}/api/auth/statistics/${loginId}/count?authId=${loginId}`
        );
        // console.log(loginId);
        if (isMounted) {
          const data = response.data;
          setCollections(data);
          console.log(data);
        }
      } catch (error) {
        console.error(error);
        // Handle error case
      }
    };

    fetchData();

    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.value}
        </span>
        <span className="link">
          <button onClick={() => navigate(data.url)} className="link">
            {data.link}
          </button>
        </span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
