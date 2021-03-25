import React, {useSelector} from 'react'
import NoteThumbnail from '../NoteThumbnail'
import "./index.css"


const NotesWidget=({notes}) => {

    return (
        <>
        <div className="Notes_Widget__container">
            <div className="N_Widget__header">
                <span className="Note_Widget_Note">NOTES <i className="arrow right"></i></span>
                <span className="Note_Widget_Recent">Recent</span>
            </div>
                <div className="N_Widget__holder">
                    {notes? notes.map(note => (
                        <NoteThumbnail key={note.id} note={note} />
                    )):null}

                </div>
        </div>

        </>
    )
}
export default NotesWidget