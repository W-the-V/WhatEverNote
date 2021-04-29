import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./index.css";

import NotesDropDown from "./NotesDD";
import { useSelectedNote } from "../../context/NoteContext";

const NoteTableItem = ({ note, user }) => {
  const { selectedNote, setSelectedNote } = useSelectedNote();
  const [showNoteActions, setShowNoteActions] = useState(false);
  // const user = useSelector(state => state.session.user);

  const onclick = (note) => {
    setSelectedNote(note);
  };

  return (
    <>
      <tr key={note.id} className="NoteOnNotebooksTable">
        <td className="SubTable-item">
          <i className="fas fa-file-alt"></i>
          <NavLink onClick={() => onclick(note)} to={`/notes/${note.id}`}>
            {note.title}
          </NavLink>
        </td>
        <td>{user.username}</td>
        <td>{new Date(note.updated_at).toLocaleDateString()}</td>
        <td>
          <span onClick={() => setShowNoteActions(true)}>...</span>
        </td>
        {showNoteActions ? (
          <td>
            <NotesDropDown
              userId={user.id}
              setShowNoteActions={setShowNoteActions}
              Note={note}
            />
          </td>
        ) : null}
      </tr>
    </>
  );
};

export default NoteTableItem;
