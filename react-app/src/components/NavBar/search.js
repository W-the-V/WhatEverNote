import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Search = ({ setShowSearch }) => {
  const [searchParameter, setSearchParameter] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  let notebooks = useSelector((state) => state.notebooks.notebooks);
  let notes = useSelector((state) => state.notes?.notes);
  useEffect(() => {
    if (searchParameter) {
      let noteTitleResultList = notes.filter((note) =>
        note.title.toLowerCase().includes(searchParameter.toLowerCase())
      );
      let noteTextResultList = notes.filter((note) =>
        note.text.toLowerCase().includes(searchParameter.toLowerCase())
      );
      let notebookNameResultList = notebooks.filter((notebook) =>
        notebook.name.toLowerCase().includes(searchParameter.toLowerCase())
      );
      setSearchResults([
        ...noteTitleResultList,
        ...notebookNameResultList,
        ...noteTextResultList,
      ]);
    } else {
      setSearchResults([]);
    }
  }, [setSearchParameter, searchParameter]);
  return (
    <div className="search-Drop-Down__container">
      <div className="close_DD" onClick={() => setShowSearch(false)}>
        <span>X</span>
      </div>

      <div className="search-input__container">
        <i className="fas fa-search"></i>
        <input
          type="text"
          className="searchText"
          value={searchParameter}
          placeholder="search"
          onChange={(e) => setSearchParameter(e.target.value)}
        />
      </div>
      <div onClick={() => setShowSearch(false)}>
        {searchResults.length
          ? searchResults.map((res) =>
              res.title ? (
                <NavLink to={`/notes/${res.id}`} className="searchItems">
                  <div key={res.id}>
                    <i className="fas fa-search"></i>
                    <i className="fas fa-file-alt"></i>
                    <span>{res.title}</span>
                  </div>
                </NavLink>
              ) : (
                <NavLink to={`/notebooks/${res.id}`} className="searchItems">
                  <div key={res.id}>
                    <i className="fas fa-search"></i>
                    <i className="fas fa-book"></i>
                    <span>{res.name}</span>
                  </div>
                </NavLink>
              )
            )
          : null}
      </div>
    </div>
  );
};
export default Search;
