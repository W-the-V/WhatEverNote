import React, { useState } from 'react';
import Dropdown from '../Dropdown';
import './NoteHeader.css';

function NoteHeader() {
  const [notebookName, setNotebookName ] = useState('Notebook')

  return (
		<>
			<div className='header' id='note-header'>
				<div className='left-container container'>
					<button
						aria-label='Expand note'
						className='button'
						id='fullscreen-button'
						type='button'
					>
						<i class='fas fa-expand'></i>
					</button>
					<div className="divider"></div>
					<div className="notebook-label">
						<button type="button" id="notebook-button">
							<span id="notebook-icon-container">
								<svg></svg>
							</span>
							<span id="notebook-name">"Notebook"</span>
						</button>
						<div></div>
					</div>
				</div>

				<div className='right-container container'>
					<div>"Only You"</div>
					<span>
						<button>Share</button>
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