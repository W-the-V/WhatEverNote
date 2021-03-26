import React, { useState } from "react";
import { NavLink } from "react-router-dom"
import {useSelector} from "react-redux"

import "./index.css"
import Dropdown from "../Dropdown";
import notebooksReducer from "../../store/notebooks";

const NotebookTableItem = ({NoteBook}) => {
    const [caretDown, setCaretDown] = useState(false)
    const [showActions, setShowActions] = useState(false)
    const [showNoteActions, setShowNoteActions] = useState(false)
    const user = useSelector(state => state.session.user);

    let notes = [{id: 1, title: "Note1", text: "Blah blah", updatedAt: "May 14", notebookId: 1},{id: 2, title: "Note2", text: "Blah blah", updatedAt: "May 14", notebookId: 1},{id: 3, title: "Note3", text: "Blah blah", updatedAt: "May 14", notebookId: 1}]
    let notesforNotebook = notes.filter(note => note.notebookId === NoteBook.id)
    const notebookActions= ["Add new note", "Rename notebook", "Add to shortcuts", "Move to trash"]
    const noteActions = ["Move...", "Edit tags...", "Add to Shortcuts", "Move to trash"]
    if(NoteBook){

   
    return (
        <>
        <tr>
            <td>
                {caretDown?<span onClick={()=>setCaretDown(false)}><i className="fas fa-caret-down"></i></span>:<span onClick={()=>setCaretDown(true)}><i className="fas fa-caret-right"></i></span>}
                <span className="NotebookTitle__td"><i className="fas fa-book"></i>{NoteBook.title}<span className="numofNotes">{NoteBook.notes?`(${NoteBook.notes.length})`:0}</span></span>
            </td>
            <td>{user.username}</td>
            <td>{NoteBook.updated_at}</td>
            <td onClick={()=>setShowActions(true)}>{showNoteActions? <Dropdown items={noteActions}/>: <span>...</span>}</td>
            {/* {showActions? <Dropdown items={notebookActions} />:null} */}
        </tr>
            {caretDown && NoteBook.notes.map(note => (<tr className="NoteOnNotebooksTable">
                <td class="SubTable-item"><i className="fas fa-file-alt"></i>{note.title}</td>
                <td >{user.username}</td>
                <td >{note.updated_at}</td>
                {/* <td><span onClick={()=>setShowNoteActions(true)}>...</span></td> */}
                <td onClick={()=>setShowNoteActions(true)} >{showNoteActions? <Dropdown items={noteActions} />:<span>...</span>}</td>
            </tr>))}
    </>
    )
}
}
export default NotebookTableItem