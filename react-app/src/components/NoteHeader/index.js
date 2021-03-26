import React, { useState } from 'react';
import Dropdown from '../Dropdown';
import './NoteHeader.css';

function NoteHeader() {
  const [notebookName, setNotebookName ] = useState('Notebook');
  const [expand, setExpand] = useState(false);
  const [expandStyle, setExpandStyle] = useState("flex: 1 0 10%")

  const expandOnClick = () => {
    setExpand(!expand);
  }
  return (
		<>
			<div className='header' id='note-header'>
				<div className='left-container container'>
					<button className='button' id='fullscreen-button' type='button' onClick={expandOnClick}>
						<div>
							<i class='fas fa-expand'></i>
						</div>
					</button>
					<div className='divider'>
						<i class='fas fa-grip-lines-vertical'></i>
					</div>
					<div className='notebook-label'>
						<button type='button' id='notebook-button'>
							<span id='notebook-icon-container'>
								<i className='fas fa-book'></i>
							</span>
							<span id='notebook-name'>Notebook</span>
						</button>
						<div></div>
					</div>
				</div>

				<div className='right-container container'>
					<div className='who-can-see'>Only You</div>
					<span>
						<button className='share-button'>Share</button>
					</span>
					<Dropdown
						items={[
							"Share...",
							"Move...",
							"Copy To...",
							"Duplicate",
							"",
							"Edit tags",
							"",
							"Add to Shortcuts",
							"Copy internal link",
							"Find within note",
						]}
					/>
				</div>
			</div>
		</>
  );
}

export default NoteHeader;