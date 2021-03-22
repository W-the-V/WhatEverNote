import React from "react"
import mousePic from "../../images/mouse.png"
 import "./index.css"
const SplashNav = () => {
    return (
        <nav id="splash-nav">
            <div>
                <img src={mousePic} />
                <h1>WhatEverNote</h1>
            </div>
            <div>
            <i className="fas fa-bars"></i>
            </div>
        </nav>
    )
}
export default SplashNav