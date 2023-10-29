import React, { useEffect } from "react";
import { BiPoll } from "react-icons/bi";
import { MdOutlineTimer } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { RiPlayListLine } from "react-icons/ri";
import { BsPinMap } from "react-icons/bs";
import {
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiOutlineGift,
} from "react-icons/ai";

import { Link, useLocation } from "react-router-dom";


const iconsData = [
  {
    id: 1,
    icon: (
      <Link to="/image_hub">
        {/* <Link to={`file/${storedType}/${theme}/image_hub`}></Link> */}
        <AiOutlineCamera size={32} className="text-[#F79489]" />
      </Link>
    ),
    name: "Image Hub",
  },
  {
    id: 2,
    icon: (
      <Link to="/video_gallery">
        <AiOutlineVideoCamera size={32} className="text-[#F79489]" />
      </Link>
    ),
    name: "Video Gallery",
  },
  {
    id: 3,
    icon: (
      <Link to="/polls">
        <BiPoll size={32} className="text-[#F79489]" />
      </Link>
    ),
    name: "Polls",
  },
  {
    id: 4,
    icon: (
      <Link to="/count_down">
        <MdOutlineTimer size={32} className="text-[#F79489]" />
      </Link>
    ),
    name: "Countdown",
  },
  {
    id: 5,
    icon: (
      <Link to="/calender">
        <SlCalender size={28} className="text-[#F79489]" />
      </Link>
    ),
    name: "Calendar",
  },
  {
    id: 6,
    icon: <BsPinMap size={29} className="text-[#F79489]" />,
    name: "Map",
  },
  {
    id: 6,
    icon: (
      <Link to="/playlists">
        <RiPlayListLine size={30} className="text-[#F79489]" />
      </Link>
    ),
    name: "Playlist",
  },

  {
    id: 7,
    icon: (
      <Link to="/gift_registry">
        <AiOutlineGift size={32} className="text-[#F79489]" />
      </Link>
    ),
    name: "Gift Registry",
  },
];
const Home = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[4];
  const theme = location.pathname.split("/")[3];
  const type = location.pathname.split("/")[2];

  useEffect(() => {
    localStorage.setItem("path", path);
    localStorage.setItem("theme", theme);
    localStorage.setItem("type", type);
  }, [path, type, theme]);


 

  return (
    <div className=" w-full h-full flex items-center justify-center flex-col">
      <div className=" w-full flex items-center justify-center mb-3 mt-3 mx-auto">
        <img
          src="https://ik.imagekit.io/imgkitt/banner.jpg?updatedAt=1685114950444"
          alt="banner"
          className="h-auto object-cover  w-[90%]"
        />
      </div>

      <div className=" w-full h-full flex items-center justify-center">
        <div className=" w-[90%] text-black bg-white shadow-md h-[400px] grid grid-cols-3 grid-rows-3 place-items-center align-bottom gap-1 p-3 py-5 mb-3">
          {iconsData.map((i, ind) => (
            <div
              key={ind}
              className=" min-w-[60px] cursor-pointer active:scale-95  items-center justify-center flex flex-col space-y-1"
            >
              {i.icon}
              <p className=" text-[11px] font-medium text-[#F79489]">
                {i.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOMBAR START
          <div className="buttom-nav drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)] absolute bottom-0 h-[60px] bg-white w-full p-2 flex items-center justify-around">
            <div className=" cursor-pointer text-[#F79489] active:scale-95">
              <FiSettings size={20} />
            </div>
            <div className=" cursor-pointer text-[#F79489] active:scale-95">
              <BiMessageDetail size={22} />
            </div>
            <div className=" cursor-pointer text-[#F79489] active:scale-95">
              <FaUser size={20} />
            </div>
          </div>
          {/* BOTTOMBAR END*/}
    </div>
  );
};

export default Home;
