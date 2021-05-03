import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import SplashSidebar from "../SplashSidebar"
import mousePic from "../../images/mouse.png"
import questionIcon from "../../images/question-mark.png";
 import "./index.css"
const SplashNav = ({setShowSidebar}) => {
    
    
    
    return (
        <nav id="splash-nav">
            <div>
                <img alt="logo" src={mousePic} alt="mouse"/>
                <h1>WhatEverNote</h1>
            </div>
            {/* <div className="hamburgerBtn" onClick={()=>setShowSidebar(true)}>
                <i className="fas fa-bars" ></i>
            </div> */}
            <div className="question-icon">
                <NavLink to="/whywhatevernote">
                    <img className="question-image" alt="question-icon" src={questionIcon} />
                </NavLink>
                
            </div>
            
        
        </nav>
    )
}
export default SplashNav