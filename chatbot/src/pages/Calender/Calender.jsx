import React, { useState, useEffect } from "react";
import TopNav from "../../components/TopNav/TopNav";
import { MdLocationPin } from "react-icons/md";
import axios from "axios";
import { API } from "../../utils/URL";
import { Link } from "react-router-dom";

const Events = () => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPath = localStorage.getItem("pathID");
        const response = await axios.get(
          `${API}/api/auth/get-events?authId=${storedPath}`
        );
        const data = response.data;
        setDetails(data.calendar);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(details);

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const openGoogleMaps = (loca) => {
    const searchURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      loca
    )}`;
    window.open(searchURL, "_blank");
  };

  return (
    <TopNav routeLink={"/"} barTitle={"Events Calendar"}>
      <div className=" relative overflow-hidden w-full  flex flex-col items-center  p-2 gap-0 overflow-y-scroll">
      
        {details?.[0]?.events?.map((data, index) => (
          <div
            key={index}
            className={` box w-[40%] pl-2 sm:w-full hover:bg-[#F2A559] overflow-hidden flex m-3 items-center rounded-2xl ${
              index % 2 === 0 ? "bg-[#F2A559]" : "bg-[#f5c79069]"
            }`}
          >
            <div className="left pl-2 w-full flex-[2.5] px-2">
              <p className="text-[13px] pt-2 text-[#8A553C]">
                {" "}
                {data.eventName}
              </p>
              <p className="text-[12px] text-[#FFF] pb-2">
                {formatDate(data.eventDate)},{formatDay(data.eventDate)}{" "}
                {data.eventTime}
              </p>
              {/* <p className=" overflow-hidden text-ellipsis whitespace-nowrap text-[11px] flex items-center"> */}
              {/* <MdLocationPin size={13} className="text-[#F79489]" /> */}
              {/* <span
                  // to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  //   data.eventLocation
                  // )}`}
                  // target="_blank"
                  // rel="noopener noreferrer"
                  className=" w-[110px]  overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {data.eventLocation}
                </span> */}
              {/* </p> */}
            </div>
            <div className="right w-full flex-[1] m-1">
              <Link to={`/event/${data._id}`}>
                <button
                  className={` active:scale-95 w-[90%] p-[5px] text-[14px] text-white bg-[#F53C75] rounded-2xl`}
                >
                  View More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </TopNav>
  );
};

export default Events;
