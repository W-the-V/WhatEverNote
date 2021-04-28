import React, { useState } from "react";
import Modal from "react-modal"
import { NavLink, useHistory } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { deleteNote, editNote } from "../../store/notes"


import "./index.css"


const NotesDropDown = ({userId, setShowNoteActions, Note}) => {
    const [showUpdateName, setShowUpdateName] = useState(false)
    const [showDeleteWarning, setShowDeleteWarning] = useState(false)
    const [showMove, setShowMove] = useState(false)
    const [newName, setNewName] = useState(Note.title)
    const [moveNoteBook, setMoveNoteBook] = useState(Note.notebook_id)
    const notebooksList = useSelector(state => state.notebooks.notebooks);
    const dispatch = useDispatch()
    
    const RenameNote = async (e) => {
        e.preventDefault()
        const updatedNote = {id:Note.id, title:newName, notebook_id:Note.notebook_id, user_id: userId, text:Note.text, created_at:Note.created_at}
        await dispatch(editNote(updatedNote))
        setShowUpdateName(false)
        
    }
    const cancelnewName = () => {
        setNewName(Note.name)
        setShowUpdateName(false)
    }
    const cancelDelete = () => {
        setShowDeleteWarning(false)
    }
    const cancelMove = () => {
        setMoveNoteBook(Note.notebook_id)
        setShowMove(false)
    }
    const DeleteNote= async (e) => {
        e.preventDefault()
        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
          }
          function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
              }
            }
            return JSON.stringify({});
          }
          let deletedNotes =getCookie(`${userId}DeletedNotes`)
          if (deletedNotes){
              deletedNotes = JSON.parse(deletedNotes)
          }
          deletedNotes[Note.id]= Note
          await setCookie(`${userId}DeletedNotes`,JSON.stringify(deletedNotes), 30 )
        await dispatch(deleteNote(userId, Note.id))
        setShowDeleteWarning(false)

    }
    const MoveNote = async (e) => {
        e.preventDefault()
        const updatedNote = {id:Note.id, title:Note.title, notebook_id:moveNoteBook, user_id: userId, text:Note.text, created_at:Note.created_at}
        await dispatch(editNote(updatedNote))
        setShowMove(false)

    }
    
    Modal.setAppElement("#root");
    return (
        <div className="NotebookDropDown__container">
            <Modal
            isOpen={showUpdateName}
            contentLabel="NameNote"
            className="NotebookInner"
            overlayClassName="NotebookOuter"
            onRequestClose={()=>setShowUpdateName(false)}
            >
                <div className="Notebook-action__container">
                    <form onSubmit={(e)=>RenameNote(e)}>
                        <h3>Edit Note Title</h3>
                        
                        <label>Title</label>
                        <input type="text" value={newName} onChange={(e)=>setNewName(e.target.value)}/>
                        <div className="NoteAction_button__container">
                        <button type="submit">Rename Note</button>
                        <button type="button" onClick={cancelnewName}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal
            isOpen={showDeleteWarning}
            contentLabel="DeleteNote"
            className="NotebookInner"
            overlayClassName="NotebookOuter"
            onRequestClose={()=>setShowDeleteWarning(false)}
            >
               <div className="Notebook-action__container">
                    
                    <form onSubmit={(e)=>DeleteNote(e)}>
                        <h3>Delete note?</h3>
                        <p>This note will be moved to Trash. This cannot be undone.</p>
                        <div className="NoteAction_button__container">
                        <button className="Delete_Button" type="submit">Delete</button>
                        <button type="button" onClick={cancelDelete}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal
            isOpen={showMove}
            contentLabel="MoveNote"
            className="MoveNoteInner"
            overlayClassName="NotebookOuter"
            onRequestClose={()=>setShowMove(false)}
            >
                <div className="Notebook-action__container">
                    
                    <form onSubmit={(e)=>MoveNote(e)}>
                        <div className="NoteAction_header__container">
                        <h3>Move note to…</h3>
                        <span onClick={()=>setShowMove(false)}>X</span>
                        </div>
                        <fieldset onChange={(e)=>setMoveNoteBook(e.target.value)}>
            {notebooksList.map((notebook) => (<label className="container_move" key={notebook.id}><i className="fas fa-book"></i>{notebook.name}<input className="notebookCheck" type="radio" name="NotebookCheckbox" defaultChecked={moveNoteBook===notebook.id} onChange={(e)=>setMoveNoteBook(e.target.value)} value={notebook.id} key={notebook.id}/><span class="checkmark"></span> </label>))}
          </fieldset>
                        
                        
                        <div className="NoteAction_button__container">
                            <button className="Delete_Button" type="submit">Move Note</button>
                            <button type="button" onClick={cancelMove}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
            
            
                <span onClick={()=>setShowNoteActions(false)} id="close">X</span>
            <ul>
                <li><NavLink to={`/notes/${Note.id}`}>Edit Note ...</NavLink></li>
                <li onClick={()=>setShowMove(true)}>Move...</li>
                <li onClick={()=>setShowUpdateName(true)}>Rename Note</li>
                <li onClick={()=>setShowDeleteWarning(true)}>Delete note</li>
                
            </ul>
        </div>
    )
}
export default NotesDropDown