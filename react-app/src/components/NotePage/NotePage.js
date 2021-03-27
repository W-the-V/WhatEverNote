import React, { useEffect, useState } from 'react'
import {useLocation} from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux'
import {getNotes} from "../../store/notes"
import "./index.css"
import Note from "./note"
import NoteInList from "./NoteInList"
import NoteHeader from "../NoteHeader/index"
import { useParams } from 'react-router'
import { getNotebooks } from '../../store/notebooks'

const NotePage = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getNotes(user.id))
        dispatch(getNotebooks(user.id))

    }, [dispatch])
    let user = useSelector(state => state.session.user)
    let mapnotes = useSelector(state => state.notes?.notes)
    let notes=[{id: 9999, title:"Untitled", text: "Add text", tags: {id:5550000, name: "untitled"}}];
    // let {notebookid} = useParams()
    // if (!notebookid && mapnotes){
        //     notes = mapnotes
        // } else if (mapnotes){
            //     notes = mapnotes.filter(note => note.notebook_id === notebookid)
            // }
            
            
            
let sortCriteriaList = ["updatedAt", "createdAt", "title", "tag"]
const [sortCriteriaDD, setSortCriteriaDD] = useState(false)
const [sortCriteria, setSortCriteria] = useState(sortCriteriaList[0])
const [ascending, setAscending] = useState(false)
const [selectedNote, setSelectedNote] = useState(notes[0])
// useEffect(()=>{
    //     switch (ascending && sortCriteria === "updatedAt"){
        //         notes.sort((a, b) => {
            
            //         })
            //     }
            // }, [ascending, sortCriteria])
    let urlPath = useLocation()
    let path = urlPath.pathname.split("/")
    useEffect(()=>{
        if (urlPath.pathname.indexOf("notes") != -1){
            let noteSelected = mapnotes?.filter(note => note.id === Number(path[path.length-1]))
            console.log(noteSelected)
            setSelectedNote(noteSelected)
        }
    },[])
    
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
    <div className="note-page__editor__container">
        <NoteHeader />
        <Note note={selectedNote}/>

    </div>
    </div>
    )
    

}
export default NotePage