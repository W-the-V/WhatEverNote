import React, { useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../store/notes";
import { updateNotebooks, deleteNotebooks } from "../../store/notebooks";
import { useSelectedNote } from "../../context/NoteContext";

import "./index.css";

const NotebookDropDown = ({ userId, setShowActions, Notebook }) => {
  let user = useSelector((state) => state.session.user);
  const [showUpdateName, setShowUpdateName] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [newName, setNewName] = useState(Notebook.name);
  const history = useHistory();
  const notebooksList = useSelector((state) => state.notebooks.notebooks);
  const { selectedNote, setSelectedNote } = useSelectedNote();

  const addNewNote = async () => {
    const defaultNote = {
      Title: "Default Note",
      Text: "<p>Start writing your note</p>",
      notebook_id: Notebook.id,
    };
    let newNote = await dispatch(createNote(defaultNote, user.id));
    setSelectedNote(newNote);
    history.push(`/notes`);
  };
  const dispatch = useDispatch();
  const RenameNoteBook = async (e) => {
    e.preventDefault();
    const updatedNotebook = {
      id: Notebook.id,
      name: newName,
      default_notebook: Notebook.default_notebook,
      user_id: userId,
    };
    await dispatch(updateNotebooks(updatedNotebook));
    setShowUpdateName(false);
  };
  const cancelnewName = () => {
    setNewName(Notebook.name);
    setShowUpdateName(false);
  };
  const cancelDelete = () => {
    setShowDeleteWarning(false);
  };
  const DeleteNoteBook = async (e) => {
    e.preventDefault();

    await dispatch(deleteNotebooks(Notebook.id, userId));
    setShowDeleteWarning(false);
  };
  const SetAsDefaultNotebook = async () => {
    const oldDefaultNoteBook = notebooksList.filter(
      (notebook) => notebook.default_notebook
    )[0];
    const updatedNotebook = {
      id: Notebook.id,
      name: Notebook.name,
      default_notebook: true,
      user_id: userId,
    };
    let old = await dispatch(
      updateNotebooks({
        id: oldDefaultNoteBook.id,
        default_notebook: false,
        name: oldDefaultNoteBook.name,
        user_id: userId,
      })
    );
    let newDefault = await dispatch(updateNotebooks(updatedNotebook));
  };
  Modal.setAppElement("#root");
  return (
    <div className="NotebookDropDown__container">
      
      <Modal
        isOpen={showUpdateName}
        contentLabel="NameNotebook"
        className="NotebookInner"
        overlayClassName="NotebookOuter"
        onRequestClose={() => setShowUpdateName(false)}
      >
        <div className="Notebook-action__container">
          <form onSubmit={(e) => RenameNoteBook(e)}>
            <h3>Rename notebook</h3>

            <label>Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <div className="NoteAction_button__container">
              <button type="submit">Rename Notebook</button>
              <button type="button" onClick={cancelnewName}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={showDeleteWarning}
        contentLabel="DeleteNotebook"
        className="NotebookInner"
        overlayClassName="NotebookOuter"
        onRequestClose={() => setShowDeleteWarning(false)}
      >
        <div className="Notebook-action__container">
          <form onSubmit={(e) => DeleteNoteBook(e)}>
            <div className="NoteAction_header__container">
              <h3>Delete notebook?</h3>
              <span id="close" onClick={() => setShowDeleteWarning(false)}>
                X
              </span>
            </div>
            <p>
              Any notes in the notebook will be moved to Trash. This cannot be
              undone.
            </p>
            <div className="NoteAction_button__container">
              <button className="Delete_Button" type="submit">
                Delete
              </button>
              <button type="button" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div className='notebook-dropdown-header'>
      <h4 className='notebook-dropdown-title'>{Notebook.name}</h4>
      <span className='notebook-dropdown-span' onClick={() => setShowActions(false)} id="close">
        X
      </span>
      </div>
      <ul>
        <li onClick={addNewNote}>Add a new Note</li>
        <li onClick={() => setShowUpdateName(true)}>Rename Notebook</li>
        <li onClick={() => setShowDeleteWarning(true)}>Delete notebook</li>
        <li onClick={SetAsDefaultNotebook}>Set as default notebook</li>
      </ul>
    </div>
  );
};
export default NotebookDropDown;
