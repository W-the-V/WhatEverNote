import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import "./index.css"
import NotebookTableItem from "./NotebookTableItem"
import { getNotebooks } from "../../store/notebooks";
import TagModal from "../TagModal/index.js"

const NoteBooks = () => {
    let Notebooks = [{id: 1, title:"Notebook_1",updatedAt: "May 14"},{id: 2, title:"Notebook_3",updatedAt: "May 14"},{id: 3, title:"Notebook_3",updatedAt: "May 14"} ]
    const [notebookSearch, setNotebookSeach] = useState("")
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getNotebooks(user.id))

    }, [user])
    let testNotebooks = useSelector(state => state.notebooks?.notebooks)
    if (testNotebooks){
        Notebooks = [...testNotebooks] }
    
    return(
    <div className="NoteBook_Page__Container">
        <TagModal />
        <div className="NoteBook_Page__Header">
            <h4>Notebooks</h4>
            <div className="search_input__container">
                <input type="text" value={notebookSearch} placeholder="Find Notebooks..."/>
                <i className="fas fa-search"></i>
            </div>
        </div>
        <div className="Notebook__Table__Container">
            <div className="Notebook-Table-Header__Container">
                <div>
                    <p><span>{Notebooks.length}</span> notebooks</p>
                </div>
                <div className="Notebook-Table-Header__Button__container">
                    <div className="addNotebook-button">
                    <i className="fas fa-book"></i>
                    <span>   New Notebook</span>
                    </div>
                    <i className="fas fa-sort-amount-up"></i>
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
                        {Notebooks.map(Notebook => (
                            <NotebookTableItem NoteBook={Notebook} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    )
}
export default NoteBooks