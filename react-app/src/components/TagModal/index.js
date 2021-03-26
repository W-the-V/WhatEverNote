import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { deactivateTagModal, activateTagModal } from "../../store/tagmodal";
import "./index.css";
const TagModal = () => {
  const dispatch = useDispatch();
  const TagModalState = useSelector((state) => state.tagModal.status);
  const [addTagModal, setAddTagModal] = useState(false);
  Modal.setAppElement("#root");
  const closeModal = () => {
    dispatch(deactivateTagModal());
  };
  const addTag = () => {
    setAddTagModal(!addTagModal);
  };
  return (
    <>
      <Modal
        isOpen={TagModalState}
        contentLabel="Tags"
        className="tagInner"
        overlayClassName="tagOuter"
        onRequestClose={closeModal}
      >
        <div className="tagInnerShell">
          <button className="closeIcoShell" onClick={closeModal}>
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
                type="search"
                className="searchInput"
                placeholder="Find tags..."
              ></input>
              <button className="searchIcon" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
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
          {/* <form className="tagCreate">
            <input type=text
          </form> */}
        </div>
      </Modal>
    </>
  );
};
export default TagModal;
