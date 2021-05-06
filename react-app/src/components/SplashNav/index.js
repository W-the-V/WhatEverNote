import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import SplashSidebar from "../SplashSidebar"
import mousePic from "../../images/mouse.png"
import questionIcon from "../../images/question-mark.png";
 import "./index.css"
const SplashNav = ({setShowSidebar}) => {
    
    return (
        <nav id="splash-nav">
            <div className="logo-icon">
                <NavLink className="logo-nav" to="/">
                    <img alt="logo" src={mousePic} style={{height: "45px"}}/>
                    <h1>WhatEverNote</h1>
                </NavLink>
            </div>
            {/* <div className="hamburgerBtn" onClick={()=>setShowSidebar(true)}>
                <i className="fas fa-bars" ></i>
            </div> */}
            <div className="question-icon">
                <NavLink to="/whywhatevernote">
                    <i class="far fa-question-circle" style={{fontSize: "45px", color: "rgba(100, 170, 45, 0.8)"}}></i>
                </NavLink>
                
            </div>
            
        
        </nav>
    )
}
export default SplashNav