import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./index.css";
import NotebookDropdown from "./NotebookDropDown";
import NoteTableItem from "./NoteTableItem";

const NotebookTableItem = ({ NoteBook }) => {
  const [caretDown, setCaretDown] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showNoteActions, setShowNoteActions] = useState(false);
  const user = useSelector((state) => state.session.user);

  if (NoteBook) {
    return (
      <>
        <tr>
          <td>
            {caretDown ? (
              <span onClick={() => setCaretDown(false)}>
                <i className="fas fa-caret-down"></i>
              </span>
            ) : (
              <span onClick={() => setCaretDown(true)}>
                <i className="fas fa-caret-right"></i>
              </span>
            )}
            <span className="NotebookTitle__td">
              <i className="fas fa-book"></i>
              {NoteBook.name}
              <span className="numofNotes">
                {NoteBook.notes ? `(${NoteBook.notes.length})` : 0}
              </span>
            </span>
          </td>
          <td>{user.username}</td>
          <td>{new Date(NoteBook.updated_at).toLocaleDateString()}</td>
          <td onClick={() => setShowActions(true)}>
            <span className="notebookDots">...</span>
          </td>
            {/* <td>{user.username}</td>
            <td>{new Date(NoteBook.updated_at).toLocaleDateString()}</td>
            <td onClick={() => showActions === false ? setShowActions(true) : setShowActions(false)}><span>...</span></td> */}
            {showActions? <td><NotebookDropdown userId={user.id} setShowActions={setShowActions} Notebook={NoteBook} /></td>:null} 
        </tr>
        {caretDown &&
          NoteBook.notes.map((note) => (
            <NoteTableItem key={note.id} note={note} user={user} />
          ))}
      </>
    );
  }
};
export default NotebookTableItem;
