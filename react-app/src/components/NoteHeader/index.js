import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editNote } from "../../store/notes";
import Dropdown from "../Dropdown";
import "./NoteHeader.css";

function NoteHeader({ userId, selectedNote }) {
  const [notebookName, setNotebookName] = useState("Notebook");
  const [noteTitle, setNoteTitle] = useState("Default Note")
  const [expand, setExpand] = useState(false);
  const [expandStyle, setExpandStyle] = useState("flex: 1 0 10%");
  let notebooks = useSelector((state) => state.notebooks.notebooks);
  const dispatch = useDispatch()
  const handleSaveNote = () => {
    let form = document.getElementsByClassName('ql-editor');
  if(form && selectedNote){
    form = form[0].innerHTML
    let updatedNote = {id:selectedNote.id,user_id:userId,title:noteTitle, notebook_id:selectedNote.notebook_id, text: form}
    dispatch(editNote(updatedNote))
  }}
  useEffect(()=>{
   
    if(selectedNote){
      setNoteTitle(selectedNote.title)
      
    }
    
  },[selectedNote])
  const findInfo = (notebooks, selected) => {
    if (notebooks) {
      let current = notebooks.filter(
        (notebook) => notebook.id === selected.notebook_id
      );
      
      
      
      
      return (
        <>
          <div className="notebook-label">
            <button type="button" id="notebook-button">
              <span id="notebook-icon-container">
                <i className="fas fa-book"></i>
              </span>
              <span id="notebook-name">{current[0]?.name}</span>
            </button>
            <div>
            
            </div>
          </div>
          <div className="divider">
            <i className="fas fa-grip-lines-vertical"></i>
          </div>
          <button type="button" id="notebook-button">
            <span id="notebook-icon-container">
              <i className="fas fa-file-alt"></i>
            </span>
            <input type="text" className='note-title-input' value={noteTitle} placeholder={noteTitle} onChange={(e)=>setNoteTitle(e.target.value)}/>
            {/* <span id="notebook-name">{selected?.title}</span> */}
          </button>
          <button onClick={handleSaveNote}>Save Note</button>
        </>
      );
    
  };
  const expandOnClick = () => {
    setExpand(!expand);
  };
  
  }
  return (
    <>
      <div className="header" id="note-header">
        <div className="left-container container">
         
          {/* <button className='button' id='fullscreen-button' type='button' onClick={expandOnClick}>
						<div>
            <i class='fas fa-expand'></i>
						</div>
					</button> */}
          {selectedNote && findInfo(notebooks, selectedNote)}
        </div>
        
        {/* <div className="right-container container">
          <div className="who-can-see">Only You</div>
          <span>
          <button className="share-button">Share</button>
          </span>
          <Dropdown
          items={[
            "Share...",
            "Move...",
            "Copy To...",
            "Duplicate",
            "",
            "Edit tags",
            "",
              "Add to Shortcuts",
              "Copy internal link",
              "Find within note",
            ]}
          />
        </div> */}
      </div>
    </>
  );
}

export default NoteHeader;
