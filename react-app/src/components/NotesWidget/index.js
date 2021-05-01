import React, { useSelector } from "react";
import NoteThumbnail from "../NoteThumbnail";
import { NavLink } from "react-router-dom";
import { useSelectedNote } from "../../context/NoteContext";
import "./index.css";

const NotesWidget = ({ notes }) => {
  const { selectedNote, setSelectedNote } = useSelectedNote();
  const onclick = (note) => {
    setSelectedNote(note);
  };


  
  return (
    <>
      <div className="Notes_Widget__container">
        <div className="N_Widget__header">
          <NavLink to="/notes">
            <span className="Note_Widget_Note">
              NOTES <i className="arrow right"></i>
            </span>
          </NavLink>
          <span className="Note_Widget_Recent">Recent</span>
        </div>
        <div className="N_Widget__holder">
          {notes
            ? notes.map((note) => (
                <NavLink key={note.id} onClick={() => onclick(note)} to={`/notes/${note.id}`}>
                  <NoteThumbnail key={note.id} note={note} />
                </NavLink>
              ))
            : null}
        </div>
      </div>
    </>
  );
};
export default NotesWidget;
