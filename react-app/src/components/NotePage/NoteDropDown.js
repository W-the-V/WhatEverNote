import React, { useState } from 'react';
import './index.css'

import onClickOutside from 'react-onclickoutside';


function NoteDropDown({ items, sortCriteriaDD, setSortCriteriaDD, setSortCriteria }) {
  const [selection, setSelection] = useState([]);

  NoteDropDown.handleClickOutside = () => setSortCriteriaDD(false);
  const toggle = () => setSortCriteriaDD(!sortCriteriaDD);
  
  NoteDropDown.handleClickOutside = () => setSortCriteriaDD(false);
  
  return (
    <div className="notedropdown__container">
      <div
        tabIndex={0}
        className="notedropdown-header"
        role="button"
        onKeyPress={() => toggle(!sortCriteriaDD)}
        onClick={() => toggle(!sortCriteriaDD)}
      >
      </div>

      {sortCriteriaDD && (
        <div className="dropdown-list">
          {items.map((item) => (
            <div className="dropdown-list-item" key={item}>
              <button type="button" className="list-item" onClick={() => setSortCriteria(item)}>
                <span>{item}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => NoteDropDown.handleClickOutside,
};

onClickOutside(NoteDropDown, clickOutsideConfig);
export default NoteDropDown
