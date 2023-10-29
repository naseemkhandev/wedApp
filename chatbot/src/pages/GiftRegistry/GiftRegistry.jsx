import React, { useState, useEffect } from "react";
import TopNav from "../../components/TopNav/TopNav";
import { BsClipboard2CheckFill } from "react-icons/bs";
import axios from "axios";
import { API } from "../../utils/URL";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { FiCircle } from "react-icons/fi";

const GiftRegistry = () => {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    authId: "",
    userName: "",
    giftName: "",
    receivedGift: true,
  });

  useEffect(() => {
    const storedPath = localStorage.getItem("pathID");

    axios
      .get(`${API}/api/auth/get-giftlists?authId=${storedPath}`)
      .then((response) => {
        setDetails(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const giftUpdateTrue = (id) => {
    axios
      .put(`${API}/api/auth/giftlists/${id}/gift`, { receivedGift: true })
      .then((response) => {
        const updatedDetails = details.map((item) =>
          item._id === id ? { ...item, receivedGift: true } : item
        );
        setDetails(updatedDetails);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  // Make gift received status false (optional)
  const giftUpdateFalse = (id) => {
    axios
      .put(`${API}/api/auth/giftlists/${id}/gift`, { receivedGift: false })
      .then((response) => {
        const updatedDetails = details.map((item) =>
          item._id === id ? { ...item, receivedGift: false } : item
        );
        setDetails(updatedDetails);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleModelOpen = () => {
    setIsOpen(true);
  };

  // GIFT FORM SUBMIT
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const storedPath = localStorage.getItem("pathID");

    try {
      const updatedFormData = {
        ...formData,
        authId: storedPath,
      };

      const response = await axios.post(
        `${API}/api/auth/giftlists`,
        updatedFormData
      );

      console.log("Gift list created:", response.data);

      // Clear the form
      setFormData({
        authId: "",
        userName: "",
        giftName: "",
        receivedGift: false,
      });
      setIsOpen(false)
    } catch (error) {
      console.error("Error creating gift list:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  return (
    <>
      <TopNav routeLink={"/"} barTitle={"Gift Registry"}>
        <div className="w-full flex flex-col items-start justify-center p-2 overflow-y-scroll mt-1">
          <div className="w-[95%] m-auto flex items-center justify-center flex-col">
            <div className="rounded-xl overflow-hidden bg-[#F2A559] relative w-[100%] h-[280px]">
              <img
                className="z-10 object-contain"
                src="https://i.postimg.cc/LXkfVswQ/white-gift-box-with-orange-ribbon-isolated-212889-339-removebg-preview-1.png"
                alt=""
              />
              <div className="absolute w-[100%] h-[280px] top-[50%] translate-y-[-50%]">
                <img
                  className="object-contain"
                  src="https://i.postimg.cc/yxvZwbVF/bgmandala.png"
                  alt=""
                />
              </div>
            </div>
            <p className="text-[#8A553C]  text-justify text-[1rem] mt-1">
              Your love and support are the most precious gifts we could
              receive. If you would like to give a gift, we have created a
              registry to make it easier for you. Thank you for celebrating with
              us!
            </p>

            <div
              onClick={handleModelOpen}
              className=" mt-3 w-[120px] text-center bg-[#8A553C] rounded-md active:scale-95 text-white cursor-pointer  p-2"
            >
              Give Gift
            </div>
          </div>

          <div className="w-[95%] m-auto">
            <div className=" w-[25%] sm:w-[90%] mt-5 flex items-start justify-start flex-col">
              <div className="flex items-center justify-center gap-2">
                <BsClipboard2CheckFill size={20} className="text-[#8A553C]" />
                <h2 className="text-[#8A553C]">Our Checklist</h2>
              </div>
              {/* <hr className="w-full h-[2.2px] bg-[#8A553C]" /> */}
              <div className="w-full space-y-3 mt-2">
                {/* options */}
                {details.map((item) => (
                  <div
                    key={item._id}
                    className={`${
                      item.receivedGift ? "bg-[#F2A559]" : "bg-[#F2A5594D]"
                    } w-full rounded-[15px] p-[2px] h-fit pl-4 flex items-center gap-3`}
                  >
                    {item.receivedGift ? (
                      <IoMdCheckmarkCircleOutline
                        className="cursor-pointer text-white"
                        // onClick={()=>giftUpdateFalse(item._id)}
                        size={20}
                      />
                    ) : (
                      <FiCircle
                        className="cursor-pointer text-white"
                        onClick={() => giftUpdateTrue(item._id)}
                        size={19}
                      />
                    )}

                    <p className=" text-[#8A553C] text-[.9rem]">
                      <span>{item.userName} --&gt; </span> {item.giftName}
                    </p>
                  </div>
                ))}
              </div>

              <div className=" mt-3">
                {/* MODEL POPUP */}
                <div
                  className={` ${
                    !isOpen ? "hidden" : "fixed"
                  } top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full sm:w-full sm:h-full rounded-md flex items-center justify-center bg-black bg-opacity-60`}
                >
                  <div className="relative max-w-3xl max-h-full m-auto flex items-start justify-center w-full h-auto">
                    <div className="relative w-[300px] p-4 rounded-md bg-white">
                      <div
                        className="active:scale-95 absolute flex items-end justify-end top-[-25px] right-[-18px] "
                        onClick={() => setIsOpen(false)}
                      >
                        <RxCross1
                          className="p-1 cursor-pointer bg-red-400 text-white rounded-full"
                          size={19}
                        />
                      </div>
                      <div className="relative top-[-50px] flex items-center justify-center">
                        <img
                          className="rounded-full bg-white w-16 shadow-md h-16 object-contain"
                          src="https://i.postimg.cc/LXkfVswQ/white-gift-box-with-orange-ribbon-isolated-212889-339-removebg-preview-1.png"
                          alt=""
                        />
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Your Name"
                          name="userName"
                          value={formData.userName}
                          onChange={handleInputChange}
                          className="border rounded-sm p-1 px-2 w-full"
                        />
                        <input
                          type="text"
                          placeholder="Gift Name"
                          name="giftName"
                          value={formData.giftName}
                          onChange={handleInputChange}
                          className="border rounded-sm p-1 px-2 w-full"
                        />
                        <button
                          type="submit"
                          onClick={handleFormSubmit}
                          className="active:scale-95 rounded-sm p-1 px-2 w-full bg-[#F2A559] text-white"
                        >
                          ADD GIFT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* MODEL POPUP */}
              </div>
            </div>
          </div>
        </div>
      </TopNav>
    </>
  );
};

export default GiftRegistry;
