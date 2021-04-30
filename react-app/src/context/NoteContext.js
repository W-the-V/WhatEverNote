import React, { createContext, useContext, useState } from "react";

export const NoteContext = createContext();
export const useSelectedNote = () => useContext(NoteContext);

export default function NoteProvider({ children }) {
  const [selectedNote, setSelectedNote] = useState("");

  return (
    <NoteContext.Provider
      value={{
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
