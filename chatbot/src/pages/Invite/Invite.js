import React, { useState, useEffect } from "react";
import TopNav from "../../components/TopNav/TopNav";
import axios from "axios";
import { API } from "../../utils/URL";
import Lottie from "lottie-react";
import animationData from "./animation.json";
import { RiFileDownloadFill } from "react-icons/ri";


const Invite = () => {
  const [inviteCards, setInviteCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedPath = localStorage.getItem("pathID");

    axios
      .get(`${API}/api/auth/get-invite-cards?authId=${storedPath}`)
      .then((response) => {
        const inviteCardsData = response?.data?.inviteCards || [];
        setInviteCards(inviteCardsData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  console.log(inviteCards);

  return (
    <>
      <TopNav routeLink={"/"} barTitle={"Invite"}>
        <div className="w-full flex flex-col items-start justify-center p-2 overflow-y-scroll mt-1">
          <div className="w-[95%] m-auto flex items-center justify-center flex-col">
            <div className="rounded-xl overflow-hidden bg-[#F2A559] w-[100%] h-[280px] relative flex items-center justify-center">
              <div className="lottie w-[240px] bg-contain ">
                <Lottie animationData={animationData} loop={true} />
              </div>
              <div className="absolute w-[100%] h-[280px] top-[50%] translate-y-[-50%]">
                <img
                  className="object-contain"
                  src="https://i.postimg.cc/yxvZwbVF/bgmandala.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="w-[95%] m-auto">
            <div className=" w-[100%] sm:w-[90%] mt-5 flex items-start justify-start flex-col">
              <div className="flex w-[100%] items-center justify-center gap-2">
                <h2 className="text-[#8A553C]">View My Invitation Cards</h2>
              </div>
              <div className="flex items-center flex-wrap gap-4 sm:gap-1 w-full">
                {inviteCards?.map((i) => (
                  <div className="mt-6 w-[200px] border border-red-800 overflow-hidden  flex items-center gap-2 p-2 ">
                    <a
                      href={`${i?.pdf?.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      <RiFileDownloadFill
                        className=" text-[#bd0f0e]"
                        size={18}
                      />
                    </a>{" "}
                    {i?.pdf?.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TopNav>

      {/* Display PDF previews for all invite cards */}
      {/* <div className="w-[95%] overflow-hidden h-[400px] m-auto mt-5">
        {inviteCards.map((card, index) => (
          <div key={index} className="mb-4">
            <Document file={card.pdf.url}>
              <Page pageNumber={1} width={300} height={400} />
            </Document>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default Invite;
