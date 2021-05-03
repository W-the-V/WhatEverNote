import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'

const NoteInList = ({note}) => {

    const createMarkup = () => {
        return {__html: note.text}
    }

    return (
        <div className="NoteinList__container">
            <span className="note-title">{note.title}</span>
            <div className="note-text" dangerouslySetInnerHTML={createMarkup()}></div>
            <div className="note-list-updated-tags__container">
            <span className="note-updated">{new Date(note.updated_at).toLocaleDateString()}</span>
            {note.tags.length? note.tags.map(tag => (
                <span className="notelist-tag" key={tag.id}>{tag.name}</span>
            )):null}


            </div>

        </div>

    )
}
export default NoteInList