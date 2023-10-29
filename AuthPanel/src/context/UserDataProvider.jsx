import React, { createContext, useContext, useState } from "react";

// Create a context to store and provide user data
export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const updateUserData = (newUserData) => {
    setUserData(newUserData);
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
