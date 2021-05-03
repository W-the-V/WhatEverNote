import React, { useState } from 'react';
import './Dropdown.css'

import onClickOutside from 'react-onclickoutside';


function Dropdown({ items }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);

  Dropdown.handleClickOutside = () => setOpen(false);
  const toggle = () => setOpen(!open);

  const handleOnClick = (item) => {
    //do some stuff here
  };
  
  Dropdown.handleClickOutside = () => setOpen(false);
  
  return (
    <div className="dropdown-wrapper">
      <div
        tabIndex={0}
        className="dropdown-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="ellipsis">
          <div className="dots">
            <span>...</span>
          </div>
        </div>
      </div>

      {open && (
        <div className="dropdown-list">
          {items.map((item) => (
            <div className="dropdown-list-item" key={item}>
              <button type="button" className="list-item" onClick={() => handleOnClick(item)}>
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
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);


