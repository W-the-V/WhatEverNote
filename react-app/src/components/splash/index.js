import { NavLink } from "react-router-dom"
import React, {useState} from "react"
import mousePic from "../../images/mouse.png"
import laptopPic from "../../images/laptopEvernote.png"
import {useSplash} from "../../context/SplashContext"
import "./index.css"

const Splash=()=> {
    const [quote, setQuote] = useState("forbes")
    return (
        <div className="splash__container">
            <div className="splash__header__container">
                <span className="splash__header1">Accomplish more with</span><span className="splash__header1">better notes</span> 
                <span className="splash__header2">WhatEverNote helps you capture your ideas and find them fast.</span>
                <div className="Sign-up__button"><NavLink to="/sign-up">Sign up for free</NavLink></div>
                <NavLink to="/log-in">Already have an account? Log in</NavLink>
            </div>
            <div className="splash__section2__container">
                <div className="splash_Image__holder">
                    <img src={laptopPic} />
                </div>
                <div className="splash_bullet__container">
                    <div className="splash__bullet">
                        <span className="splash__bullet__header">WORK ANYWHERE</span>
                        <span className="splash__bullet__text">Keep important info handy by syncing your notes to all your devices.</span>
                    </div>
                    <div className="splash__bullet">
                        <span className="splash__bullet__header">CAPTURE WHAT MATTERS</span>
                        <span className="splash__bullet__text">Add text, images, audio, scans, PDFs, and documents to your notes.</span>
                    </div>
                    <div className="splash__bullet">
                        <span className="splash__bullet__header">YOUR NOTES, YOUR WAY</span>
                        <span className="splash__bullet__text">Express yourself with formatting tools that help you write how you think.</span>
                    </div>
                    <div className="splash__bullet">
                        <span className="splash__bullet__header">FIND THINGS FAST</span>
                        <span className="splash__bullet__text">Get what you need, when you need it. Search gives you results as you type.</span>
                    </div>

                </div>
            </div>
            <div className="splash__section3__container">
                <div className="splash__green__quote">"</div>
                <div className="splash__quote">
                    {quote === "forbes" ? <span className="splash__quote__text.fade-in">"Such a great App... Whatever"</span> : null}
                    {quote === "inc" ? <span className="splash__quote__text.fade-in">"Another hot review"</span> : null}
                    {quote === "verge" ? <span className="splash__quote__text fade-in">"Verge loves this company"</span> : null}
                    {quote === "business" ? <span>"Business thinks we're  bomb"</span> : null}
                    {quote === "well-good" ? <span>"Another hot review"</span> : null}

                    <span>-An Expert</span>
                </div>
                <div className="splash_mag__container">
                    <ul>
                        <li>FakeMag</li>
                        <li onClick={() => setQuote("forbes")}>FakeMag2</li>
                        <li onClick={() => setQuote("inc")}>FakeMag3</li>
                        <li onClick={() => setQuote("verge")}>FakeMag4</li>
                        <li onClick={() => setQuote("business")}>FakeMag5</li>
                        <li onClick={() => setQuote("well-good")}>FakeMag6</li>
                    </ul>
                </div>
            </div>
            <div className="splash__section4__container">
                <div className="splash__footer__header__container"><img src={mousePic} /><span>WhatEverNote</span></div>
                <div>
                    I don't know What to put in this chunk
                </div>

                
            </div>

        </div>
    )
}
export default Splash