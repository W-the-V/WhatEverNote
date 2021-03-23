import React, { useState } from 'react';
import DropDown from '../Dropdown'
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
    <form>
      <div className="container" id="scratch-holder">
        <div className="scratch-container container">
          <section className="scratch-top container">
            <div className="scratch-title-label">
              <div className="scratch-title">SCRATCH PAD</div>
              <DropDown items = {["Convert to note", "Clear scratch pad", "Remove widget"]} />
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
        </div>
      </div>
    </form>
  );
};

export default ScratchPad;