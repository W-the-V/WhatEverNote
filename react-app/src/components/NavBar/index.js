import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./index.css";
import LogoutButton from "../auth/LogoutButton";
import { deactivateTagModal, activateTagModal } from "../../store/tagmodal";
import { createNote } from "../../store/notes"
import { createNotebook } from "../../store/notebooks"
import Search from "./search";

const NavBar = ({ setAuthenticated }) => {
  let user = useSelector((state) => state.session.user);
  let TagModal = useSelector((state) => state.tagModal.status);
  let notebooks = useSelector((state) => state.notebooks.notebooks)
  const [showSearch, setShowSearch] = useState(false)
  const dispatch = useDispatch();
  const tagClick = (e) => {
    if (TagModal) dispatch(deactivateTagModal());
    else dispatch(activateTagModal());
  };


  const addNewNote = async () => {
    let defaultNotebook;
    if (notebooks){
      defaultNotebook = notebooks.filter(notebook => notebook.default_notebook)[0]
      const defaultNote = {Title: "Default Note", Text: "<p>Start writing your note</p>", notebook_id: defaultNotebook.id}
      let newNote = await dispatch(createNote(defaultNote, user.id))
      return (
        <Redirect to={`/notes/${newNote.id}`}/>
      )
      
    }
  }
  // addNewNote()
  return (
    <nav className="homeNavBarOuter">
      <div className="nav_top__circles">
        <div className="nav_circles letter-circle">{user.firstName[0]}</div>
        <div className="nav_circles search-circle" onClick={()=>setShowSearch(true)}>
          <i className="fas fa-search"></i>
        </div>
          {showSearch? <Search setShowSearch={setShowSearch}/>: null}
        <div className="nav_circles plus-circle" onClick={addNewNote}>
          <i className="fas fa-plus"></i>
        </div>
      </div>
      <div>
        <div className="middle_nav__container">
          <div className="icon__holder home_icon">
            <NavLink to="/" exact={true} activeClassName="active">
              <i className="fas fa-home"></i>
            </NavLink>
          </div>
          <div className="icon__holder star_icon">
            <i className="fas fa-star"></i>
          </div>
          <div className="icon__holder note_icon">
            <NavLink to="/notes" exact={true}>
              <i className="fas fa-file-alt"></i>
            </NavLink>
          </div>
        </div>
        <div className="middle2_nav__container">
        <div className="icon__holder notebook_icon">
          <NavLink to="/notebooks">
          <i className="fas fa-book"></i>
          </NavLink>
        </div>
        <div className="icon__holder tag_icon">
          <i className="fas fa-tag"></i>
        </div>
        <div className="icon__holder user_icon">
          <i className="fas fa-user-friends"></i>
        </div>
        </div>
        <div className="middle3_nav__container">
          <NavLink to="/trash">
          <div className="icon__holder trash_icon">
            <i className="fas fa-trash"></i>
          </div>
          </NavLink>
        </div>
      </div>
    
    </nav>
  );
};

export default NavBar;
