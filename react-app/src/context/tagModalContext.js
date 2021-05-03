import React, { createContext, useContext, useState } from "react";

export const TagModalContext = createContext();
export const useTagModal = () => useContext(TagModalContext);

export default function TagModalContextProvider({ children }) {
  const [showTagModal, setShowTagModal] = useState(false);

  return (
    <TagModalContext.Provider
      value={{
        showTagModal,
        setShowTagModal
      }}
    >
      {children}
    </TagModalContext.Provider>
  );
}
