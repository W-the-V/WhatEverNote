import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, useLocation } from "react-router-dom";
import { getNotes } from "../../store/notes";
import "./index.css";
import Note from "./note";
import NoteInList from "./NoteInList";
import NoteHeader from "../NoteHeader/index";
import { useHistory, useParams } from "react-router";
import { getNotebooks } from "../../store/notebooks";
import NoteDropDown from "./NoteDropDown";
import { useSelectedNote } from "../../context/NoteContext";
const NotePage = () => {
  let user = useSelector((state) => state.session.user);
  let notes = useSelector((state) => state.notes?.notes);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotes(user.id));
    dispatch(getNotebooks(user.id));
  }, [dispatch]);

  let sortCriteriaList = ["updatedAt", "title"];
  const [ascending, setAscending] = useState(false);
  const { selectedNote, setSelectedNote } = useSelectedNote();
  const [sortCriteriaDD, setSortCriteriaDD] = useState(false);
  const [sortCriteria, setSortCriteria] = useState(sortCriteriaList[0]);
  let urlPath = useLocation();
  let path = urlPath.pathname.split("/");
  let noteSelected;

  const noteClick = (note) => {
    setSelectedNote(note);
  };

  useEffect(() => {
    if (notes) {
      //   setSelectedNote("");
      if (ascending && sortCriteria === "updatedAt") {
        notes.sort((a, b) => {
          return new Date(a.updated_at) - new Date(b.updated_at);
        });
      } else if (ascending && sortCriteria === "title") {
        notes.sort((a, b) => {
          let aTitle = a.title.toUpperCase();
          let bTitle = b.title.toUpperCase();
          if (aTitle < bTitle) {
            return -1;
          }
          if (bTitle < aTitle) {
            return 1;
          }
          return 0;
        });
      } else if (!ascending && sortCriteria === "updatedAt") {
        notes.sort((a, b) => {
          return new Date(b.updated_at) - new Date(a.updated_at);
        });
      } else if (!ascending && sortCriteria === "title") {
        notes.sort((a, b) => {
          let aTitle = a.title.toUpperCase();
          let bTitle = b.title.toUpperCase();
          if (aTitle > bTitle) {
            return -1;
          }
          if (bTitle < aTitle) {
            return 1;
          }
          return 0;
        });

        setSelectedNote(notes[0]);
      }
    }
  }, [ascending, sortCriteria]);

  if (path.indexOf("notes") != -1) {
    if (path[path.length - 1] === "notes") {
      notes = notes;
    } else {
      noteSelected = notes?.filter((note) => note.id === selectedNote?.id)[0];
      setSelectedNote(noteSelected);
    }
  } else if (path.indexOf("notebooks") != -1) {
    notes = notes?.filter(
      (note) => (note.notebook_id === note.id) === selectedNote?.id
    )[0];
    setSelectedNote(noteSelected);
  }

  return (
    <div className="Note-Page__container">
      <div className="notesidebar__container">
        <div className="notesidebar__header">
          <div className="notesidebar__innerheader">
            <i className="fas fa-file-alt"></i>
            <span>Notes</span>
          </div>
          <div className="notesidebar__innerheader2">
            <span>{`${notes?.length} notes`}</span>
            <div className="filter-sort-buttons__container">
              {sortCriteriaDD ? (
                <NoteDropDown
                  items={sortCriteriaList}
                  sortCriteriaDD={sortCriteriaDD}
                  setSortCriteriaDD={setSortCriteriaDD}
                  setSortCriteria={setSortCriteria}
                />
              ) : null}
              {ascending ? (
                <i
                  className="fas fa-sort-amount-up"
                  onClick={() => setAscending(false)}
                ></i>
              ) : (
                <i
                  className="fas fa-sort-amount-down"
                  onClick={() => setAscending(true)}
                ></i>
              )}
              <i
                className="fas fa-filter"
                onClick={() => setSortCriteriaDD(true)}
              ></i>
            </div>
          </div>
        </div>
        <div>
          {notes?.map((note) => (
            <div
              className="note_side__outer"
              onClick={() => noteClick(note)}
              key={note.id}
            >
              <NoteInList note={note} />
            </div>
          ))}
        </div>
      </div>
      <div className="note-page__editor__container">
        <NoteHeader selectedNote={selectedNote} />
        {/* {console.log(selectedNote, "FROM NOTEPAGE JS")} */}
        {selectedNote ? <Note /> : <div>Please select a Note</div>}

        {/* <Note /> */}
      </div>
    </div>
  );
};
export default NotePage;
