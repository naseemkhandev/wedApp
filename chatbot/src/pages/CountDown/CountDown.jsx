import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../utils/URL";
import TopNav from "../../components/TopNav/TopNav";
import { AiFillClockCircle } from "react-icons/ai";

const CountDown = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const storedPath = localStorage.getItem("pathID");

    axios
      .get(`${API}/api/mergedetails?authId=${storedPath}`)
      .then((response) => {
        setDetails(response.data);
        if (
          response.data.mergedData &&
          response.data.mergedData[0] &&
          response.data.mergedData[0].eventDetails
        ) {
          const targetDate = new Date(
            response.data.mergedData[0].eventDetails.date
          );
          startCountdown(targetDate);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const startCountdown = (targetDate) => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      const remainingDays = Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0);
      const remainingHours = Math.max(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        0
      );
      const remainingMinutes = Math.max(
        Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        0
      );

      setDays(remainingDays);
      setHours(remainingHours);
      setMinutes(remainingMinutes);
    };

    calculateTime();

    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  };

  return (
    <TopNav routeLink={"/"} barTitle={"Count Down"}>
      <div className="w-full flex flex-col items-center justify-center p-2 gap-3 overflow-y-scroll mt-24">
        <div className=" relative flex items-center justify-center mt-2">
          <img
            className=" w-full sm:w-[90%]"
            src="https://i.postimg.cc/jSjThkwz/auspicious-copper-kalash-with-coconut-flowers-leaves-arranged-puja-466689-23721-removebg-preview-1.png"
            alt=""
          />
        </div>
        <div className="text-center mt-2 space-y-2">
          <p className="text-[1.3rem] pb-2 font-medium">The best is yet to come!</p>
          <p className="text-[20px] p-3 flex items-center justify-center gap-2 rounded-2xl bg-[#F2A559] text-[#fff] font-medium">
            <span>
              <AiFillClockCircle className=" text-[#8A553C]" />
            </span>{" "}
            <span>
              {days} Days : {hours} Hours{" "}
            </span>
          </p>
        </div>
        <div className=" mt-3 flex items-center justify-center">
          <Link
            to="/calender"
            className="bg-[#F53C75] text-[1rem] text-[#fff] p-2 px-7 rounded-3xl active:scale-95"
          >
            Events
          </Link>
        </div>
      </div>
    </TopNav>
  );
};

export default CountDown;




