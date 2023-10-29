import "./navbar.scss";
import { useContext, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../BASE_URL";
import { UserDataContext } from "../../context/UserDataProvider";

const Navbar = () => {
  const authData = JSON.parse(localStorage.getItem("data"));
  const { userData, updateUserData } = useContext(UserDataContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authData?.authEmail) {
          const response = await axios.get(
            `${BASE_URL}/api/auth/logdetails/${authData.authEmail}`
          );
          updateUserData(response.data.user);
        }
      } catch (error) {
        console.error(error);
        // Handle the error as needed
      }
    };

    // Fetch data only if user data is not available
    if (!userData) {
      fetchData();
    }
  }, [authData?.authEmail, userData, updateUserData]);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="">{""}</div>
        <div className="items">
          <div title={userData?.authEmail} className="item space-x-1">
            <img
              src={
                userData && userData.authPhoto?.url
                  ? userData.authPhoto.url
                  : "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt=""
              className="avatar bg-cover object-cover"
            />
            <span>{userData?.authName}</span>
          </div>
          <div className="item"></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
