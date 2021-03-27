import React, { useState } from "react";
import { NavLink } from "react-router-dom"
import {useSelector} from "react-redux"

import "./index.css"
import notebooksReducer from "../../store/notebooks";

const NotebookDropDown = ({setShowActions, Notebook}) => {
    return (
        <div className="NotebookDropDown__container">
            <ul>
                <li>Add a new Note</li>
                <li>Rename Notebook</li>
                <li>Delete notebook</li>
                <li>Set as default notebook</li>
            </ul>
        </div>
    )
}