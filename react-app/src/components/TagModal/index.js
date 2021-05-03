import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import {getTags, createTag} from "../../store/tags"
import { deactivateTagModal, activateTagModal } from "../../store/tagmodal";
import { useTagModal } from "../../context/tagModalContext";

import "./index.css";
const TagModal = () => {
  const dispatch = useDispatch();
  // const TagModalState = useSelector((state) => state.tagModal.status);
  let user = useSelector((state) => state.session.user);
  const tags = useSelector((state) => state.tags?.tags?.tags)
  const [addTagModal, setAddTagModal] = useState(false);
  const [newTag, setNewTag] = useState('')
  const {showTagModal, setShowTagModal} = useTagModal()
  const [searchParameter, setSearchParameter] = useState('')
    const [searchResults, setSearchResults] = useState([])
    useEffect(()=> {
      dispatch(getTags(user.id))
    }, [dispatch])
    
    useEffect(()=>{
      if((tags && tags.length )&& !searchParameter){
        setSearchResults(tags)
      }
      if (searchParameter){
          let searchTagsRes = tags.filter( tag => tag.name.toLowerCase().includes(searchParameter))
          setSearchResults(searchTagsRes)
      }else{
          setSearchResults([])
      }
  },[setSearchParameter, searchParameter, tags,dispatch])
  
  Modal.setAppElement("#root");
  const closeModal = () => {
    dispatch(deactivateTagModal());
  };
  const addTag = () => {
    setAddTagModal(!addTagModal);
  };
  const addNewTag = async () => {
    await dispatch(createTag({name:newTag, user_id: user.id}, user.id))
   

  }
  return (
    <>
      <Modal
        isOpen={showTagModal}
        contentLabel="Tags"
        className="tagInner"
        overlayClassName="tagOuter"
        onRequestClose={()=>setShowTagModal(false)}
      >
        <div className="tagInnerShell">
          <button className="closeIcoShell" onClick={()=>setShowTagModal(false)}>
            <i className="fas fa-times closeIco"></i>
          </button>
          <div className="tagHeaderShell">
            <p className="tagTitle">Tags</p>
            <div className="addIcon" onClick={addTag}>
              <i className="fas fa-plus"></i>
            </div>
          </div>
          <div className="searchBarShell">
            <form className="tagSearch">
              <input
                type="text"
                className="searchInput"
                placeholder="Find tags..."
                value={searchParameter}
                onChange={(e)=>setSearchParameter(e.target.value)}
              />
              <button className="searchIcon" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
          {searchResults.length && <div className="searchResults">
            {searchResults.map(result => (
              <div key={result.id}>
              <span ><i className="fas fa-tag"></i>{result.name}</span>
                {result.notes.map(note => (
                  <NavLink key={`${note.id}+${result.id}`} to={`notes/${note.id}`} onClick={()=>setShowTagModal(false)}>
              <i className="fas fa-file-alt"></i>
                    <span>{note.title}</span>
                  </NavLink>
                ))}
              </div>
            ))}

          </div>}
        </div>
      </Modal>
      <Modal
        isOpen={addTagModal}
        contentLabel="AddTag"
        className="defaultInner"
        overlayClassName="defaultOuter"
        onRequestClose={addTag}
      >
        <div className="form_container">
          <button className="closeIcoShell" onClick={addTag}>
            <i className="fas fa-times closeIco"></i>
          </button>
          <p className="createTitle">Create new tag</p>
          <form className="tagCreate" onSubmit={addNewTag}>
            <label>New tag</label>
            <input type="text" value={newTag} onChange={(e)=> setNewTag(e.target.value)}/>
            <button type="submit">+ New Tag</button>
          </form>
        </div>
      </Modal>
    </>
  );
};
export default TagModal;
