import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotesWidget from "../NotesWidget";
import ScratchPad from "../ScratchPad";
import TagCloud from "../TagCloud";
import { getNotes } from "../../store/notes";
import "./index.css";
import "../NotesWidget/index.css";
import { getTags } from "../../store/tags";
import { getNotebooks } from "../../store/notebooks";
import TagModal from "../TagModal";

const Home = () => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.session.user);
  let mapnotes = useSelector((state) => state.notes?.notes);
  let maptags = useSelector((state) => state.tags);
  let notes;
  if (mapnotes) {
    notes = mapnotes.flat();
  }
  let date = new Date();
  let daysList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayofWeek = date.getDay();
  let day =
    `${daysList[dayofWeek].toUpperCase()}, ` +
    date.toLocaleString("default", { month: "long" }).toUpperCase() +
    ` ${date.getDate()}, ${date.getFullYear()}`;
  let timeofDay = date.getHours() > 12 ? "afternoon" : "morning";
  useEffect(() => {
    dispatch(getNotes(user.id));
    dispatch(getTags(user.id));
    dispatch(getNotebooks(user.id));
  }, [dispatch]);
  return (
    <>
    <TagModal />
      <div className="home_page__container">
        <div className="home_photo">
          <div className="hello">
            <h2>{`Good ${timeofDay}!`}</h2>
            <h3>{day}</h3>
          </div>
          <div className="customizeHome">
            <button className="customize__button">
              <span>
                <i className="fas fa-edit"></i> Customize
              </span>
            </button>
          </div>
        </div>
        <NotesWidget notes={notes} />
        <ScratchPad />
        <TagCloud />
      </div>
    </>
  );
};
export default Home;
