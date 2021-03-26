import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getNotes} from "../../store/notes"
import "./index.css"
import Note from "./note"
import NoteInList from "./NoteInList"

const NotePage = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getNotes(user.id))

    }, [dispatch])
    let user = useSelector(state => state.session.user)
    let mapnotes = useSelector(state => state.notes?.notes)

    let notes=[{id: 9999, title:"Untitled", text: "Add text", tags: {id:5550000, name: "untitled"}}];
     if (mapnotes){
        notes = mapnotes

    }
    
   
    let sortCriteriaList = ["updatedAt", "createdAt", "title", "tag"]
    const [sortCriteriaDD, setSortCriteriaDD] = useState(false)
    const [sortCriteria, setSortCriteria] = useState(sortCriteriaList[0])
    const [ascending, setAscending] = useState(false)
    const [selectedNote, setSelectedNote] = useState(notes[0])
    useEffect(()=>{
        
    }, [ascending, sortCriteria])
    return(
    <div className="Note-Page__container">
        <div className="notesidebar__container">
        <div className="notesidebar__header">
            <div className="notesidebar__innerheader">
                <i className="fas fa-file-alt"></i>
                <span>Notes</span>
            </div>
            <div className="notesidebar__innerheader2">
                <span>{`${notes.length} notes`}</span>
                <div className="filter-sort-buttons__container">
                {ascending? <i className="fas fa-sort-amount-up" onClick={()=>setAscending(true)}></i>:<i className="fas fa-sort-amount-down" onClick={()=>setAscending(false)}></i>}
                <i className="fas fa-filter" onClick={()=>setSortCriteriaDD(true)}></i>

            </div>
            </div>
            </div>
            <div>
                {notes.map(note =>(
                    <div onClick={()=>setSelectedNote(note)} key={note.id}><NoteInList note={note} /></div>
                ))}
            </div>
        
    </div>
        <Note note={selectedNote}/>
    </div>
    )
    

}
export default NotePage