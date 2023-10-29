import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BiHomeAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";

const TopNav = ({ children, routeLink, barTitle }) => {
  return (
    <div className="relative w-full h-full m-auto">
      <nav className="flex items-center justify-between bg-[#F2CDB5] w-full p-3 shadow-md sticky top-0 z-[5] sm:p-[13px] ">
        <div className=" flex items-center gap-3">
          <Link to={routeLink}>
            <MdOutlineArrowBackIosNew className="text-[#8A553C]" size={20} />
          </Link>
          <p className=" text-[1.1rem]">{barTitle}</p>
        </div>
        <Link to="/">
          <BiHomeAlt2 className="text-[#8A553C]" size={20} />
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default TopNav;
