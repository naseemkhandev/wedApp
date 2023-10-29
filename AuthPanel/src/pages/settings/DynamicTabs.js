import React, { useState } from "react";
import TabcontentBody from "./TabcontentBody";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const DynamicTabs = ({chatId,chatTitle}) => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [contents, setContents] = useState([]);
  const [selectedIcons, setSelectedIcons] = useState([]);

  const addTab = () => {
    const newTabIndex = tabs.length;
    setTabs([...tabs, newTabIndex]);
    setContents([...contents, `Content ${newTabIndex + 1}`]);
    setSelectedIcons([...selectedIcons, null]);
  };

  const removeTab = (index) => {
    const updatedTabs = [...tabs];
    updatedTabs.splice(index, 1);
    setTabs(updatedTabs);

    const updatedContents = [...contents];
    updatedContents.splice(index, 1);
    setContents(updatedContents);

    const updatedSelectedIcons = [...selectedIcons];
    updatedSelectedIcons.splice(index, 1);
    setSelectedIcons(updatedSelectedIcons);

    // Adjust activeTab if the removed tab is currently active
    if (activeTab === index) {
      setActiveTab(Math.max(0, index - 1));
    }
  };

  const switchTab = (index) => {
    setActiveTab(index);
    
  };

  return (
    <div className="flex">
      <div className="flex flex-col w-10/12">
        <div className="p-6">
          <div className="flex">
            <div className="flex">
              {tabs.map((tabIndex, index) => (
                <button
                  key={tabIndex}
                  onClick={() => switchTab(index)}
                  className={`p-4 text-left border ${
                    activeTab === index
                      ? "bg-purple-500 text-white"
                      : "bg-purple-100 text-gray-700"
                  }`}
                >
                  Tab {tabIndex + 1}
                  <span
                    className="ml-2 text-red-500 cursor-pointer"
                    onClick={() => removeTab(index)}
                  >
                    &times;
                  </span>
                </button>
              ))}
              <button
                onClick={addTab}
                className="p-4 font-bold text-white bg-gray-500"
              >
                Add Tab
              </button>
            </div>
          </div>

          <div className="w-3/4">
            <div className="p-4 bg-purple-200">
              {/* Header Section */}

              {/* Content Section */}
              <div className="p-4 bg-white rounded-md">
                {contents.map((content, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${activeTab === index ? "" : "hidden"}`}
                  >
                    <h2 className="mb-2 text-lg font-bold">
                      Step {activeTab + 1}
                    </h2>

                    <TabcontentBody activeTab={activeTab} chatId={chatId} chatTitle={chatTitle} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicTabs;
