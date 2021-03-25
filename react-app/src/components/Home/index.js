import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import NotesWidget from '../NotesWidget'
import ScratchPad from '../ScratchPad'
import TagCloud from '../TagCloud'
import {getNotes} from "../../store/notes"
import "./index.css"


const Home = () => {
    const dispatch = useDispatch()
    let user = useSelector(state => state.session.user)
    let notes = useSelector(state => state.notes.notes.notebooks)
    console.log(notes)
    let date = new Date()
    let daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let dayofWeek = date.getDay()
    let day = `${daysList[dayofWeek].toUpperCase()}, `+ date.toLocaleString('default', { month: 'long' }).toUpperCase()+` ${date.getDate()}, ${date.getFullYear()}`
    let timeofDay=(date.getHours()>12)? "afternoon":"morning"
    
    dispatch(getNotes(user.id))
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