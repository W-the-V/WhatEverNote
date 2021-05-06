import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import "./index.css";
import LogoutButton from "../auth/LogoutButton";
import { deactivateTagModal, activateTagModal } from "../../store/tagmodal";
import { createNote } from "../../store/notes";
import * as sessionActions from '../../store/session';
import { createNotebook } from "../../store/notebooks";
import { getNotes } from "../../store/notes";
import { useSelectedNote } from "../../context/NoteContext";
import { useTagModal } from "../../context/tagModalContext";
import Search from "./search";

const NavBar = ({ setAuthenticated }) => {
  let user = useSelector((state) => state.session.user);
  let TagModal = useSelector((state) => state.tagModal.status);
  let notebooks = useSelector((state) => state.notebooks.notebooks);
  let notes = useSelector((state) => state.notes?.notes);
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const { selectedNote, setSelectedNote } = useSelectedNote();
  const {showTagModal, setShowTagModal} = useTagModal()
  const [firstNote, setFirstNote] = useState({})

  const [showSearch, setShowSearch] = useState(false);
  const [showStarred, setShowStarred] = useState(false);
  const dispatch = useDispatch();
  const tagClick = (e) => {
    if (TagModal) dispatch(deactivateTagModal());
    else dispatch(activateTagModal());
  };
  useEffect(()=>{
    if(notes){
      setFirstNote(notes[0])
    }
  }, [dispatch,notes])
  const addNewNote = async () => {
    let defaultNotebook;

    defaultNotebook = notebooks.filter(
      (notebook) => notebook.default_notebook
    )[0];
    const defaultNote = {
      Title: "Default Note",
      Text: "<p>Start writing your note</p>",
      notebook_id: defaultNotebook.id,
    };
    let newNote = await dispatch(createNote(defaultNote, user.id));
    dispatch(getNotes(user.id));
    setSelectedNote(newNote);
    history.push(`/notes`);
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };


  return (
    <nav className="homeNavBarOuter">
      <div className="nav_top__circles">
        <div className="nav_circles letter-circle" onClick={openMenu} title='Log out'>{user.firstName[0]} </div>
        {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
        <div
          className="nav_circles search-circle"
          onClick={() => setShowSearch(true)}
          title='Search'
        >
          <i className="fas fa-search"></i>
        </div>
        {showSearch ? <Search setShowSearch={setShowSearch} /> : null}
        <div className="nav_circles plus-circle" onClick={addNewNote} title='Add new note'>
          <i className="fas fa-plus"></i>
        </div>
      </div>
      <div>
        <div className="middle_nav__container">
          <div className="icon__holder home_icon">
            <NavLink to="/" exact={true} activeClassName="active">
              <i className="fas fa-home" title="Home"></i>
            </NavLink>
          </div>
          {/* <div
            className="icon__holder star_icon"
            onClick={() => setShowStarred(true)}
          >
            <i className="fas fa-star"></i>
          </div> */}
          {/* {showStarred ? <Starred setShowStarred={setShowStarred} /> : null} */}
          <div className="icon__holder note_icon">
            <NavLink
              to="/notes"
              exact={true}
              onClick={() => setSelectedNote(firstNote)}
              title='Notes'
            >
              <i className="fas fa-file-alt"></i>
            </NavLink>
          </div>
        </div>
        <div className="middle2_nav__container">
          <div className="icon__holder notebook_icon">
            <NavLink to="/notebooks" title='Notebooks'>
              <i className="fas fa-book"></i>
            </NavLink>
          </div>
          <div className="icon__holder tag_icon" title='Tags' onClick={()=>setShowTagModal(true)}>
            <i className="fas fa-tag"></i>
          </div>
          {/* <div className="icon__holder user_icon">
            <i className="fas fa-user-friends"></i>
          </div> */}
        </div>
        <div className="middle3_nav__container">
          <NavLink to="/trash">
            <div className="icon__holder trash_icon" title='Trash'>
              <i className="fas fa-trash"></i>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
