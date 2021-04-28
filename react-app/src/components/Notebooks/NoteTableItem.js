import React, { useState } from "react";
import { NavLink } from "react-router-dom"
import {useSelector} from "react-redux"

import "./index.css"

import NotesDropDown from "./NotesDD";


const NoteTableItem = ({note, user}) => {
    
    const [showNoteActions, setShowNoteActions] = useState(false)
    // const user = useSelector(state => state.session.user);

    
    

   
    return (
        <>
        <tr key={note.id} className="NoteOnNotebooksTable">
                <td className="SubTable-item"><i className="fas fa-file-alt"></i><NavLink to={`/notes/${note.id}`}>{note.title}</NavLink></td>
                <td >{user.username}</td>
                <td >{new Date(note.updated_at).toLocaleDateString()}</td>
                <td><span onClick={()=>setShowNoteActions(true)}>...</span></td>
                {showNoteActions?<td><NotesDropDown userId={user.id} setShowNoteActions={setShowNoteActions} Note={note}/></td>:null}
                
        </tr>
    </>
    )
}

export default NoteTableItem