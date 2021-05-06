import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom"
import Modal from "react-modal"
import TagModal from "../TagModal"
import {useSelector, useDispatch} from "react-redux"
import "./index.css"
import NotebookTableItem from "./NotebookTableItem"
import { getNotebooks, createNotebook } from "../../store/notebooks";

const NoteBooks = () => {
    
    const [notebookSearch, setNotebookSeach] = useState("")
    const [showNewNotebook, setShowNewNotebook] = useState(false)
    const [newNotebookName, setNewNotebookName] = useState('')
    const [ascending, setAscending] = useState(true)
    const [notebooks, setNotebooks] = useState([])
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(async ()=>{
       let testNotebooks = await dispatch(getNotebooks(user.id))
       setNotebooks(testNotebooks.notebooks)


    }, [user])

    
    let testNotebooks = useSelector(state => state.notebooks?.notebooks)
    const searchNotebooks = () => {
        let orignotebooks = [...notebooks]
        let searchResults= orignotebooks.filter(res => res.name.toLowerCase().includes(notebookSearch.toLowerCase()))
        setNotebooks(searchResults)
    }
    const addNewNoteBook = async (e)=>{
        e.preventDefault()
       let newNotebook = await dispatch(createNotebook(newNotebookName, user.id))
       
    history.push(`/notebooks/${newNotebook.id}`)

    }
    const cancelnewNotebook = () => {
        setNewNotebookName('')
        setShowNewNotebook(false)
    }
    Modal.setAppElement("#root");
    useEffect(()=>{
        if (!notebookSearch){
            setNotebooks(testNotebooks)
        }

    },[notebookSearch, setNotebookSeach])
    const setSortNotebooks = ()=>{
        let sortednotebooks = [...notebooks]
        if(ascending){
            sortednotebooks.sort((a,b) => {
                
                let aTitle = a.name.toUpperCase()
                let bTitle = b.name.toUpperCase()
                if (aTitle < bTitle){
                    return -1
                }
                if (bTitle < aTitle){
                    return 1
                }
                return 0
            })

        }else{
            sortednotebooks.sort((a,b) => {
                
                let aTitle = a.name.toUpperCase()
                let bTitle = b.name.toUpperCase()
                if (aTitle < bTitle){
                    return 1
                }
                if (bTitle < aTitle){
                    return -1
                }
                return 0
            })
        }
         setNotebooks(sortednotebooks)
         setAscending(!ascending)
    }
    return(
    <div className="NoteBook_Page__Container">
        <TagModal />
        <Modal
            isOpen={showNewNotebook}
            contentLabel="NewNotebook"
            className="NotebookInner"
            overlayClassName="NotebookOuter"
            onRequestClose={()=>setShowNewNotebook(false)}
            >
                <div className="Notebook-action__container">
                    <form onSubmit={(e)=>addNewNoteBook(e)}>
                        <h3>Create new notebook</h3>
                        <p>Notebooks are useful for grouping notes around a common topic. They can be private or shared.</p>
                        <label>Name</label>
                        <input type="text" value={newNotebookName} onChange={(e)=>setNewNotebookName(e.target.value)}/>
                        <div className="NoteAction_button__container">
                        <button type="submit">Add New Notebook</button>
                        <button type="button" onClick={cancelnewNotebook}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>

        <div className="NoteBook_Page__Header">
            <h4>Notebooks</h4>
            <div className="search_input__container">
                <input type="text" value={notebookSearch} placeholder="Find Notebooks..." onChange={(e)=>setNotebookSeach(e.target.value)}/>
                <i className="fas fa-search" onClick={searchNotebooks}></i>
            </div>
        </div>
        <div className="Notebook__Table__Container">
            <div className="Notebook-Table-Header__Container">
                <div>
                    {notebooks?<p><span>{notebooks?.length}</span> notebooks</p>:<p>notebooks</p>}
                </div>
                <div className="Notebook-Table-Header__Button__container">
                    <div className="addNotebook-button" onClick={()=>setShowNewNotebook(true)}>
                    <i className="fas fa-book"></i>
                    <span>   New Notebook</span>
                    </div>
                    {ascending?<i className="fas fa-sort-amount-down" onClick={setSortNotebooks}></i> :<i className="fas fa-sort-amount-up" onClick={setSortNotebooks}></i>}
                </div>
            </div>
            <div className="table__Container">
                <table>
                    <thead>
                        <tr>
                            <th>TITLE</th>
                            <th>CREATED BY</th>
                            <th>UPDATED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notebooks?notebooks.map(Notebook => (
                            
                            <NotebookTableItem key={Notebook.id} NoteBook={Notebook} />
                            
                        )):null}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    )
}

export default NoteBooks