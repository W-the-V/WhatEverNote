import React, { useState } from "react"
import SplashSidebar from "../SplashSidebar"
import mousePic from "../../images/mouse.png"
 import "./index.css"
const SplashNav = ({setShowSidebar}) => {
    
    
    
    return (
        <nav id="splash-nav">
            <div>
                <img alt="logo" src={mousePic} alt="mouse"/>
                <h1>WhatEverNote</h1>
            </div>
            <div className="hamburgerBtn" onClick={()=>setShowSidebar(true)}>
                <i className="fas fa-bars" ></i>
            </div>
            
        
        </nav>
    )
}
export default SplashNav