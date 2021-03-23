import React from "react"
import { NavLink } from "react-router-dom"
import "./index.css"

const SplashSidebar = ({setShowSidebar})=>{
    
    return (
        <div className="splashSidebar__container">
                <div className="close_sidebar" onClick={()=>setShowSidebar(false)}><i className="fas fa-times"></i></div>
                <ul>
                    <li><NavLink to="/whywhatevernote" >WHY WHATEVERNOTE</NavLink></li>
                    <li><NavLink to="/features">FEATURES</NavLink></li>
                    <li> <NavLink to="/login">LOG IN</NavLink></li>
                </ul>

        </div>
    )
}
export default SplashSidebar