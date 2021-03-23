import React, {useState} from "react"
import WhyThumbnail from "../WhyThumbnail"
import SplashNav from "../SplashNav"
import SplashSidebar from "../SplashSidebar"
import capture from "../../images/captureIcon.png"
import together from "../../images/togetherIcon.png"
import fast from "../../images/fastIcon.png"
import personalize from "../../images/personalizeIcon.png"
import "./index.css"
const Whywhatevernote = () => {
    const [showSidebar, setShowSidebar] = useState(false)

    const whyList = [{title:"Take Notes",text:"Create, read, update, delete notes.", url:capture },{title:"Keep it Together",text:" Organize your notes into Notebooks. Create a personal space for all your ideas and information", url:together},{title:"Find it Fast",text:"Get the right note, right away with search. Create your own keyword tags.", url: fast},{title:"Make it your own",text:"Add Styling and Color to your Notes", url:personalize}]
    return (
        <div className="WhyContainer">
             <SplashNav setShowSidebar={setShowSidebar}/>
             {(showSidebar)?<SplashSidebar setShowSidebar={setShowSidebar} />:null}
            <div className="WhyHeader">
                <span className="HeaderWhyQ">Why Choose WhatEverNote?</span>
                <p>WhatEvernote gives you whatever you need to keep your life organized—great note taking, project planning, and easy ways to find what you need, when you need it.</p>
                <div className="Login-btn"><button>Let's Get Started</button></div>
            </div>
            <div className="WhyThumbnail__container">
                {whyList.map(why => (
                    <WhyThumbnail why={why}/>
                ))}

            </div>
            <div className="Why_Explaination">
                <span className="Why_EX1">A home for what's important</span>
                <span className="Why_EX2">Get quick access to the information </span>
                <div>THIS WILL BE A SCREENSHOT</div>
            </div>

        </div>
    )
}
export default Whywhatevernote