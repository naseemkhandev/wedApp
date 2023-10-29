import React, { createContext, useState } from "react";

export const CollectionContext = createContext();


export const CollectionContextProvider = ({ children }) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  return (
    <CollectionContext.Provider
    value={{
      selectedCollectionId,
      setSelectedCollectionId,
    }}
  >
      {children}
    </CollectionContext.Provider>
  );
};
