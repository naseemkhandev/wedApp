import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsCheckLg, BsPencilSquare } from "react-icons/bs";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import BASE_URL from "../../components/BASE_URL";

const Viewchat = () => {
  const [collections, setCollections] = useState([]);
  const [editCollection, setEditCollection] = useState([]);
  const [editedData, setEditedData] = useState({
    message: "",
    location: "",
    question: "",
  });

  const fetchData = async () => {
    try {
      const loginId = localStorage.getItem("authId");
      const response = await axios.get(
        `${BASE_URL}/api/auth/chatdetails?authId=${loginId}`
      );
      const data = response.data.details;

      setCollections(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);

  const handleToggleEdit = (index) => {
    setEditedData({
      message: "",
      location: "",
      question: "",
    })
    const newEditState = [...editCollection];
    newEditState[index] = !newEditState[index];
    setEditCollection(newEditState);
  };

  const sendUpdatedData = async (chatId) => {
    const _body = {
      messages: [
        { text: editedData.message }
      ],
      
      location: [
        {
          url: editedData.location,
        }
      ],
      options: [
        {
          question: editedData.question
        }
      ]
    }
    const apiEndPoint = `${BASE_URL}/api/auth/chatdetails/${chatId}`
    try {
      const res = await fetch(apiEndPoint, { method: "PUT", body: JSON.stringify(_body), headers: { "Content-Type": "application/json" } })
      if (res.ok) {
        console.log("updated")
        fetchData();
      }
      console.log(res)
    } catch (err) { console.log(err) }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };
  const renderTabContent = () => {
    if (collections && Object.keys(collections).length === 0) {
      return <p>No Data</p>;
    }

    return (
      <div>
        {Object.entries(collections).map(([chatId, orders]) => (
          <div className="mt-5" key={chatId}>
            <h2 className="font-bold">{orders[0]?.chatTitle} </h2>
            <ul className="flex flex-wrap my-2">

              {orders.map((order, index) => (
                <div key={order._id}>
                  <li
                    key={index}
                  >
                    <div className={`mr-2 cursor-pointer py-2 px-4 rounded  bg-blue-500 text-white`}>
                      Order {index + 1}
                    </div>
                    <div className="my-4 mr-4 w-[320px] overflow-hidden">
                      <div

                        className={`border border-gray-300 rounded p-4 relative`}
                      >

                        {!editCollection[order._id] ? (
                          <span
                            className="absolute top-6 right-2 cursor-pointer p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                            onClick={() => handleToggleEdit(order._id)}
                          >
                            <BsPencilSquare />
                          </span>
                        ) : (
                          <span
                            className="absolute top-6 right-2 cursor-pointer p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-base"
                            onClick={() => {
                              sendUpdatedData(order._id)
                              setEditCollection([])
                            }}
                          >
                            <BsCheckLg />
                          </span>
                        )}

                        <h3 className="text-xl font-bold">
                          Order {index + 1} Details
                        </h3>

                        <p>Date: {order?.date}</p>
                        <p>Time: {order?.time}</p>

                        {order?.messages.length > 0 && (
                          <>
                            <h4 className="mt-4 font-bold">Messages</h4>{" "}
                            {order?.messages.map((message, messageIndex) => (
                              <div key={messageIndex}>
                                {!editCollection[order._id] ? (
                                  <p>Text: {message?.text}</p>
                                ) : (
                                  message?.text && (
                                    <div>
                                      Text:{" "}
                                      <input
                                        type="text"
                                        name="message"
                                        defaultValue={message?.text}
                                        onChange={handleChange}
                                        className="border rounded pl-1 bg-black/5 dark:bg-white/5 outline-none text-sm py-1 w-[83%] ml-1"
                                        placeholder="Enter your message"
                                      />
                                    </div>
                                  )
                                )}
                              </div>
                            ))}
                          </>
                        )}

                        {order?.location.length > 0 && (
                          <>
                            <h4 className="mt-4 font-bold">Location</h4>
                            {order?.location[0] ? (
                              <>
                                {!editCollection[order._id] ? (
                                  <p>URL: {order?.location[0].url}</p>
                                ) : (
                                  order?.location[0].url && (
                                    <div>
                                      URL:{" "}
                                      <input
                                        type="text"
                                        name="location"
                                        defaultValue={order?.location[0].url}
                                        onChange={handleChange}
                                        placeholder="Enter your location"
                                        className="border rounded pl-1 bg-black/5 dark:bg-white/5 outline-none text-sm py-1 w-[83%] ml-1"
                                      />
                                    </div>
                                  )
                                )}
                              </>
                            ) : (
                              <p>No location available</p>
                            )}
                          </>
                        )}

                        {order?.photos.length > 0 && (
                          <>
                            <h4 className="mt-4 font-bold">Photos</h4>
                            {order?.photos?.map((photo, photoIndex) => (
                              <div key={photoIndex}>
                                <img src={photo?.url} alt="" />
                                <p>URL: {photo?.url}</p>
                                <p>Name: {photo?.name}</p>
                              </div>
                            ))}
                          </>
                        )}

                        {order?.videos.length > 0 && (
                          <>
                            <h4 className="mt-4 font-bold">Videos</h4>
                            {order?.videos?.map((video, videoIndex) => (
                              <div key={videoIndex}>
                                <video src={video?.url} controls alt="" />
                                <p>URL: {video?.url}</p>
                                <p>Name: {video?.name}</p>
                              </div>
                            ))}
                          </>
                        )}

                        {order?.options.length > 0 && (
                          <>
                            <h4 className="mt-4 font-bold">Options</h4>
                            {order?.options?.map((option, optionIndex, index) => (
                              <div key={optionIndex}>
                                {!editCollection[order._id] ? (
                                  <p>Question: {option?.question}</p>
                                ) : (
                                  option?.question && (
                                    <div className="flex">
                                      Question:{" "}
                                      <input
                                        type="text"
                                        name="question"
                                        defaultValue={option?.question}
                                        onChange={handleChange}
                                        placeholder="Enter your question"
                                        className="border rounded pl-1 bg-black/5 dark:bg-white/5 outline-none text-sm py-1 w-[78%] ml-1"
                                      />
                                    </div>
                                  )
                                )}
                                {option?.rows.length > 0 && (
                                  <>
                                    {" "}
                                    <p>Options:</p>
                                    {option?.rows.map((row, i) => (
                                      <div key={i} className="ms-2 mt-2 flex gap-3">
                                        <p>Answer: {row?.answer},</p>
                                        <p>Move To: {row?.moveOn},</p>
                                      </div>
                                    ))}
                                  </>
                                )}
                              </div>
                            ))}
                          </>
                        )}
                      </div>

                    </div>
                  </li>
                </div>

              ))}
            </ul>

          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-10/12">
        <Navbar />
        <div className="p-6 w-50">
          <div className="">{renderTabContent()}</div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Viewchat;
