import React, { useState } from 'react';
import Dropdown from '../Dropdown'
import './ScratchPad.css';

function ScratchPad() {
  const [scratchNote, setScratchNote] = useState('')

  const handleChange = (e) => {
    e.preventDefault();
    setScratchNote(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
      <>
        <div className="scratch-container container">
    <form>
          <section className="scratch-top container">
            <div className="scratch-title-label">
              <div className="scratch-title">
                <p className="scratch-text">scratch pad</p>
              </div>
              <div className="dropdown-container">
                <Dropdown
                  items={["Convert to note", "Clear scratch pad", "Remove widget"]}
                />
              </div>
            </div>
          </section>

          <div className="text-box-container">
            <textarea
              className="scratch-text-box"
              placeholder="Start writing..."
              maxLength="300"
              onChange={handleChange}
            ></textarea>
          </div>
    </form>
        </div>
      </>
  );
};

export default ScratchPad;