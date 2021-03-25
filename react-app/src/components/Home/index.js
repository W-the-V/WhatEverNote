import React from 'react'
import NotesWidget from '../NotesWidget'
import ScratchPad from '../ScratchPad'
import TagCloud from '../TagCloud'
import "./index.css"


const Home = () => {
    let user = {"id":1,"firstname":"Fake", "lastname": "McDonald", "username":"FakeMcFake", "email":"fake@fake.com"}
    let date = new Date()
    let daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let dayofWeek = date.getDay()
    let day = `${daysList[dayofWeek].toUpperCase()}, `+ date.toLocaleString('default', { month: 'long' }).toUpperCase()+` ${date.getDate()}, ${date.getFullYear()}`
    let timeofDay=(date.getHours()>12)? "afternoon":"morning"
    return (
        <>
        <div className="home_page__container">
            <div className="home_photo">
                <div className="hello">
                    <h2>{`Good ${timeofDay}!`}</h2>
                    <h3>{day}</h3>
                </div>
                <div className="customizeHome" >
                    <button className="customize__button">
                        <span><i className="fas fa-edit"></i> Customize</span>
                    </button>  
                </div>
            </div>
            <NotesWidget />
            <ScratchPad/>
            <TagCloud/>
        </div>
        
            </>
    )
}
export default Home