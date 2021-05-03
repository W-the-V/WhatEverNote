import React from "react";
import "./DevBio.css";
import programmer_girl from "../../images/programmer-girl.png";
import programmer_guy from "../../images/programmer-guy.png";

const DevBio = () => {

  const devInfo = [
        {
            name: "Rheannone Ball",
            github: "https://github.com/rheannone",
            linkedin: "https://www.linkedin.com/in/rheannone/",
            image: programmer_girl,
        },
        {
            name: "Olivia Byrnes",
            github: "https://github.com/OByrnes",
            linkedin: "https://www.linkedin.com/in/olivia-byrnes-85861b1b3/",
            image: programmer_girl,
        },
        {
            name: "Walter Hills",
            github: "https://github.com/W-the-V",
            linkedin: "https://www.linkedin.com/in/walter-hills-a52535205/",
            image: programmer_guy,
        },
        {
            name: "Alpesh Vyas",
            github: "https://github.com/alpvyas",
            linkedin: "https://www.linkedin.com/in/alpesh-vyas-8211b9206/",
            image: programmer_guy,
        },
    ]

  return (

    <>
    {devInfo.map((dev) => (
      <div className="dev-container">
        <div className="image-container">
          <img className="dev-image" alt="dev-image" src={dev.image}/>
        </div>
        <div className="info-container">
          <div className="name-container">
            <h3>{dev.name}</h3>
          </div>
          <div className="links-container">
            <div className="github link">
              <a href={dev.github}>GitHub</a>
            </div>
            <div className="linkedin link">
              <a href={dev.linkedin}>LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
      ))}
    </>
  )
};

export default DevBio;