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
export const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);




function undoChange() {
  // document.getElementById("reactQuillShell").history.undo();
  // console.log(this.quill);
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}
// form.onsubmit = function() {
//   // Populate hidden form on submit
//   var about = document.querySelector('input[name=about]');
//   about.value = JSON.stringify(this.quill.getContents());
//   console.log("Submitted", (form).serialize(), (form).serializeArray());}
export const CustomToolbar = () => (
  <div id="toolbar" className="toolbar">
    <span class="ql-formats">
      <button className="ql-undo">
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
      {/* <button class="ql-header" value="2"></button> */}
      <button class="ql-blockquote"></button>
      {/* <button class="ql-strike"></button> */}
    </span>
    <span class="ql-formats">
      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>
      <button class="ql-indent" value="-1"></button>
      <button class="ql-indent" value="+1"></button>
    </span>
    {/* <span class="ql-formats">
      <button class="ql-direction" value="rtl"></button>
      <select class="ql-align"></select>
    </span> */}
    <span class="ql-formats">
      <button class="ql-link"></button>
      <button class="ql-image"></button>
      {/* <button class="ql-video"></button> */}
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
  

  useEffect(() => {
    if (selectedNote && selectedNote.text) {
      setEditorHtml(selectedNote.text);
      setLoaded(true);
    }
    if (editorHtml) {


      return;
    }
  }, [selectedNote, setSelectedNote]);
  
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

    defaultNotebook = notebooks.filter(
      (notebook) => notebook.default_notebook
    )[0];
    const defaultNote = {
      Title: "Default Note",
      Text: "<p>Start writing your note</p>",
      notebook_id: defaultNotebook.id,
    };
    let newNote = await dispatch(createNote(defaultNote, user.id));
    setSelectedNote(newNote);
    history.push(`/notes`);
  };
  // let quill = new Quill('#editor__container', {
  // });
  const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        undo: undoChange,
        // autoSave: autoSave,
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
          <div onBlur={handleSaveNote} onFocus={() => setSaving("saving...")}>
          {editorHtml ? (
            <ReactQuill
              value={editorHtml}
              bounds={"#editor__container"}
              // placeholder={props.placeholder}
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
