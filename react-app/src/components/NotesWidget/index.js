import React from 'react'
import NoteThumbnail from '../NoteThumbnail'
import "./index.css"


const NotesWidget=() => {
    let notes = [{title: "First Note", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec erat a dui rutrum faucibus sit amet et nibh. Ut mauris odio, feugiat id gravida quis, pharetra non justo. Morbi sit amet neque enim. Vestibulum at eros egestas, faucibus ante a, feugiat odio. Sed sollicitudin sodales mattis. Nulla non ipsum gravida, egestas nibh vitae, aliquam justo. Morbi nec risus vel velit mattis commodo in eu urna. Aenean nec elementum urna. Quisque erat ipsum, feugiat ac accumsan sed, tristique in quam. Donec at ante nec urna molestie iaculis. Nulla in tortor volutpat, mollis risus non, rutrum elit. Ut cursus ante eros, sed aliquam arcu mollis eget. Nulla nec lectus viverra, vestibulum turpis volutpat, imperdiet turpis. Maecenas purus odio, commodo vitae mauris non, euismod egestas dui. Duis aliquet, tellus ut lobortis facilisis, elit massa faucibus sem, nec fringilla eros erat id libero. Sed ac suscipit quam.", tags:["tag1","tag2"], updatedAt: "Yesterday"},{title: "Fake Note2", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec erat a dui rutrum faucibus sit amet et nibh. Ut mauris odio, feugiat id gravida quis, pharetra non justo. Morbi sit amet neque enim. Vestibulum at eros egestas, faucibus ante a, feugiat odio. Sed sollicitudin sodales mattis. Nulla non ipsum gravida, egestas nibh vitae, aliquam justo. Morbi nec risus vel velit mattis commodo in eu urna. Aenean nec elementum urna. Quisque erat ipsum, feugiat ac accumsan sed, tristique in quam. Donec at ante nec urna molestie iaculis. Nulla in tortor volutpat, mollis risus non, rutrum elit. Ut cursus ante eros, sed aliquam arcu mollis eget. Nulla nec lectus viverra, vestibulum turpis volutpat, imperdiet turpis. Maecenas purus odio, commodo vitae mauris non, euismod egestas dui. Duis aliquet, tellus ut lobortis facilisis, elit massa faucibus sem, nec fringilla eros erat id libero. Sed ac suscipit quam.", tags:["tag1","tag2"], updatedAt: "Yesterday"},{title: "Fake Note3", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec erat a dui rutrum faucibus sit amet et nibh. Ut mauris odio, feugiat id gravida quis, pharetra non justo. Morbi sit amet neque enim. Vestibulum at eros egestas, faucibus ante a, feugiat odio. Sed sollicitudin sodales mattis. Nulla non ipsum gravida, egestas nibh vitae, aliquam justo. Morbi nec risus vel velit mattis commodo in eu urna. Aenean nec elementum urna. Quisque erat ipsum, feugiat ac accumsan sed, tristique in quam. Donec at ante nec urna molestie iaculis. Nulla in tortor volutpat, mollis risus non, rutrum elit. Ut cursus ante eros, sed aliquam arcu mollis eget. Nulla nec lectus viverra, vestibulum turpis volutpat, imperdiet turpis. Maecenas purus odio, commodo vitae mauris non, euismod egestas dui. Duis aliquet, tellus ut lobortis facilisis, elit massa faucibus sem, nec fringilla eros erat id libero. Sed ac suscipit quam.", tags:["tag1","tag2"], updatedAt: "Yesterday"},{title: "Fake Note", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec erat a dui rutrum faucibus sit amet et nibh. Ut mauris odio, feugiat id gravida quis, pharetra non justo. Morbi sit amet neque enim. Vestibulum at eros egestas, faucibus ante a, feugiat odio. Sed sollicitudin sodales mattis. Nulla non ipsum gravida, egestas nibh vitae, aliquam justo. Morbi nec risus vel velit mattis commodo in eu urna. Aenean nec elementum urna. Quisque erat ipsum, feugiat ac accumsan sed, tristique in quam. Donec at ante nec urna molestie iaculis. Nulla in tortor volutpat, mollis risus non, rutrum elit. Ut cursus ante eros, sed aliquam arcu mollis eget. Nulla nec lectus viverra, vestibulum turpis volutpat, imperdiet turpis. Maecenas purus odio, commodo vitae mauris non, euismod egestas dui. Duis aliquet, tellus ut lobortis facilisis, elit massa faucibus sem, nec fringilla eros erat id libero. Sed ac suscipit quam.", tags:["tag1","tag2"], updatedAt: "Yesterday"}]
    return (
        <>
        <div className="Notes_Widget__container">
            <div className="N_Widget__header">
                <span className="Note_Widget_Note">NOTES <i className="arrow right"></i></span>
                <span className="Note_Widget_Recent">Recent</span>
            </div>
                <div className="N_Widget__holder">
                    {notes.map(note => (
                        <NoteThumbnail key={note.title} note={note} />
                    ))}

                </div>
        </div>

        </>
    )
}
export default NotesWidget