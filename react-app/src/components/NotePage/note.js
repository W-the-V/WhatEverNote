import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill, { Quill } from "react-quill";
import { NavLink, useHistory } from "react-router-dom"
import "react-quill/dist/quill.snow.css";
import { createNote, editNote, deleteNote, saveNote } from "../../store/notes";
import {createTag, createNoteToTag} from "../../store/tags"
import { useSelectedNote } from "../../context/NoteContext";
import "../Note/index.css";
import "./index.css";
import deepcopy from "deepcopy";

// undo icon SVG path
export const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);



// methods from Quill working with React Quill
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

export const CustomToolbar = () => (
  <div id="toolbar" className="toolbar">
    <span class="ql-formats">
//   grab button from Quill
      <button className="ql-undo">
//   insert undo component
        <CustomUndo />
      </button>
      <select class="ql-font"></select>
    </span>
    <span class="ql-formats">
      <select class="ql-size"></select>
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>
      <select class="ql-color"></select>
      <button class="ql-header" value="1"></button>
      <button class="ql-blockquote"></button>
    </span>
    <span class="ql-formats">
      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>
      <button class="ql-indent" value="-1"></button>
      <button class="ql-indent" value="+1"></button>
    </span>
    <span class="ql-formats">
      <button class="ql-link"></button>
      <button class="ql-image"></button>
    </span>
  </div>
);

const Note = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { selectedNote, setSelectedNote } = useSelectedNote();
  const [editorHtml, setEditorHtml] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [addTag, setAddTag] = useState({})
  const [tagAdd, setTagAdd] = useState('')
  const [ saving, setSaving ] = useState("all changes saved.")
  const user = useSelector(state => state.session.user);
  const tags = useSelector(state => state.tags?.tags?.tags)
  let notebooks = useSelector(state => state.notebooks?.notebooks)
  
//   check that all relevant note data is grabbed and set it as active note
  useEffect(() => {
    if (selectedNote && selectedNote.text) {
      setEditorHtml(selectedNote.text);
      setLoaded(true);
    }
    if (editorHtml) {
      return;
    }
//     rerender when the active note changes
  }, [selectedNote, setSelectedNote]);
//   save function grabs the content of the quill editor and dispatches the edit action
  const handleSaveNote = async () => {
    let noteTitleHtmlCollection = document.getElementsByClassName('grab-note-title');
    let noteTitle = noteTitleHtmlCollection["notebook-name"]?.textContent ? noteTitleHtmlCollection["notebook-name"]?.textContent : document.getElementById("note-title-input").value 
    let form = document.getElementsByClassName('ql-editor');
    if(form && selectedNote){
    form = form[0].innerHTML
    let updatedNote = {id:selectedNote.id,user_id:user.id, title:noteTitle, notebook_id:selectedNote.notebook_id, text: form}
    let res = await dispatch(editNote(updatedNote))
    if(res){
      setSelectedNote(updatedNote)
    }
    setSaving("all changes saved.")
  }}
  const addNewTag = async () => {
    let newTag = await dispatch(createTag({name:tagAdd, user_id: user.id}, user.id))
    addTagToNote(newTag)
  }
  const addTagToNote = async (tag) => {
    let data = {note_id: selectedNote.id, id: tag.id}
    await dispatch(createNoteToTag(data, user.id))
    let selectedNoteCopy = deepcopy(selectedNote)
    selectedNoteCopy.tags.push(tag)
    setSelectedNote(selectedNoteCopy)
    setTagAdd('')
  }
  const addNewNote = async () => {
    let defaultNotebook;
// finds the default notebook
    defaultNotebook = notebooks.filter(
      (notebook) => notebook.default_notebook
    )[0];
//     adds the note to the default notebook
    const defaultNote = {
      Title: "Default Note",
      Text: "<p>Start writing your note</p>",
      notebook_id: defaultNotebook.id,
    };
//     adds the default note and sets as the active note
    let newNote = await dispatch(createNote(defaultNote, user.id));
    setSelectedNote(newNote);
    history.push(`/notes`);
  };
  
// for quill to handle toolbar functions 
 const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        undo: undoChange,
      },
      history: {
        delay: 500,
        maxStack: 20,
        userOnly: true,
      },
    },
  };
  let formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];
  
  
  return (
    <div>
      <div className="text-editor" id="editor__container">
        <div className="editor__container" id="toolbar">
          <CustomToolbar />
//     autosave!!
          <div onBlur={handleSaveNote} onFocus={() => setSaving("saving...")}>
//     check if the active note's HTML is in the editor, if so, display it. 
          {editorHtml ? (
            <ReactQuill
              value={editorHtml}
              bounds={"#editor__container"}
              modules={modules}
              formats={formats}
              id="reactQuillShell"
            />
          ) : null}
          </div>
        </div>
        <div className="editor-footer">
          <div className='selected-note-tags__container'>
            <div className="selected-note-tags">
              {selectedNote.tags && selectedNote.tags.map(tag => (
                <span key={tag.id} className="selectedNote__individualtag">{tag.name}</span>
              ))}
            </div>
            <div>
                <span className="addTag" onClick={addNewTag}>+ Add Tag</span>
                <input type="text" value={tagAdd} onChange={(e)=>setTagAdd(e.target.value)} placeholder="find a tag or add a tag..."/>
            </div>
            <div>
              {(tagAdd && tags)&&tags.filter(tag => tag.name.toLowerCase().includes(tagAdd.toLowerCase())).map(tag => (
                <span className="selectedNote__individualtag" onClick={()=>addTagToNote(tag)}>{tag.name}</span>
              ))}
            </div>
          </div>
          <div className="footer-right">
          <div className="footer__save__text">
            <p>{saving}</p>
          </div>
            <button className="footer__button" type="button" onClick={addNewNote}>
              <p className="Footer_button_text">
                Add New Note 
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Note;
