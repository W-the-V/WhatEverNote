import React from "react"
import "./index.css"

const WhyThumbnail =  ({why}) => {
    return (
        <div className="whyThumbnailContainer">
            <img alt="logo" alt="icon" src={why.url}/>
            <span className="WhyThumbnailTitle">{why.title}</span>
            <span className="WhyThumbnailText">{why.text}</span>
        </div>
    )
}
export default WhyThumbnail