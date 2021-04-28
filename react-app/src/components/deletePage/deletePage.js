import React, { useState } from "react";
import { useSelector } from "react-redux"
import {useDispatch} from "react-redux"
import { useHistory } from "react-router-dom"
import Modal from "react-modal"
import "./index.css"
import Note from "../NotePage/note"
import { createNote } from "../../store/notes"
import { useSelectedNote } from '../../context/NoteContext';
import NoteInList from "../NotePage/NoteInList";
const DeletePage = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const [showEmptyTrash, setShowEmptyTrash] = useState(false)
    
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
    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    let deletedItems =JSON.parse(getCookie(`${user.id}DeletedNotes`))
    const {selectedNote, setSelectedNote} = useSelectedNote()
    const restoreItem = async (item) =>{
        delete deletedItems[item.id]
        setCookie(`${user.id}DeletedNotes`, JSON.stringify(deletedItems), 30 )
        let restoredNote = {Title:item.title, Text:item.text, notebook_id: item.notebook_id}
        let newNote = await dispatch(createNote(restoredNote,user.id))
        history.push(`/notes/${newNote.id}`)
    }
    const emptyTrash = (e) => {
      e.preventDefault()
      setCookie(`${user.id}DeletedNotes`," ", -1)
      history.push("/home")
    }
    const cancelEmptyTrash = () => {
      setShowEmptyTrash(false)
    }
    Modal.setAppElement("#root");
    
    return (
      <div className="Deleted-Note-Page__container">
            <Modal
            isOpen={showEmptyTrash}
            contentLabel="NameNotebook"
            className="NotebookInner"
            overlayClassName="NotebookOuter"
            onRequestClose={()=>setShowEmptyTrash(false)}
            >
                <div className="Notebook-action__container">
                    <form onSubmit={(e)=>emptyTrash(e)}>
                    <div className='NoteAction_header__container'>
                        <h3>Empty Trash?</h3>
                        <span id="close" onClick={()=>setShowEmptyTrash(false)}>X</span>
                        </div>
                        <p>Are you sure you want to empty the trash? All items in the trash will be permanently deleted and cannot be restored.</p>
                        <div className="NoteAction_button__container">
                        <button type="submit" className="Delete_Button">Empty Trash</button>
                        <button type="button" onClick={cancelEmptyTrash}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
            <div className="header">
              <div>
                <h1 className="trash-h1"><i className="fas fa-trash"></i> Trash</h1>
                <button className="emptyTrash__button" onClick={()=>setShowEmptyTrash(true)}>Empty Trash</button>
              </div>
              <span>{Object.keys(deletedItems).length} {Object.keys(deletedItems).length>1 || Object.keys(deletedItems).length===0? `notes`:`note`} </span>
            </div>
            <div className="Deleted-Note-Page__content">
            <div className="notesidebar__container">
            {Object.keys(deletedItems).length !== 0? Object.keys(deletedItems).map( item => (
                <div onClick={()=>setSelectedNote(deletedItems[item])} className="deletedItem" key={deletedItems[item].id}>
                    <NoteInList note={deletedItems[item]}/>
                    <span className="restore" onClick={()=>restoreItem(deletedItems[item])}>Restore Note</span>
                </div>
            )):<div className="empty-trash__container">
              <i className="fas fa-trash"></i>
              <span>Your trash is empty</span>
              <span className="empty-trash-info">When you have notes in your trash click the "restore" button to restore them or Empty trash to empty the trash</span>
              </div>}
            </div>
            <div className="note-page__editor__container">
       
              {Object.keys(selectedNote).length !== 0? <Note /> : null}
            </div>

    </div>
        </div>
        
    )

}
export default DeletePage