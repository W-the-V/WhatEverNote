import React from 'react'
import "./index.css"

const NoteThumbnail = ({note}) => {

        const createMarkup = () => {
        return {__html: note.text}
    }

    return (
        <div className="Note_Thumbnail__container">
            <div className="Inner_Note_thumbnail">
                <div className="text_holder">
                    <span id="note_thumbnail_title">{note.title}</span>
                    <div dangerouslySetInnerHTML={createMarkup()}></div>

                </div>

            </div>

            <div className="note_footer">
                <div className="tag_note_thumbnail_container">
                {/* {note?.tags.map(tag=> (
                    <div key={tag} className="tag_note_thumbnail">
                        <span>{tag}</span>
                        </div>
                ))} */}

                </div>
                <p>{note.updatedAt}</p>

            </div>
        </div>
    )

}
export default NoteThumbnail