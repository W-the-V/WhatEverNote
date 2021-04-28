import React from "react";


const SearchDropDown = () =>{
    const [searchTitleNote, setSearchTitleNote] = useState("")
    const [searchTextNote, setSearchTextNote] = useState("")
    let user = useSelector(state => state.session.user)
    let notes = useSelector(state => state.notes?.notes)
    let searchResults;

    searchResults=notes?.filter(note => note.text.includes(searchTextNote) && note.text.includes(searchTitleNote))

    return (
        <div>
            <div>
                <input placeholder="search for note title...." type="text" value={} onChange={()=>setSearchTitleNote(e.target.value)} />
                <i className="fas fa-search"></i>
            </div>
            <div>
                <input placeholder="search for note title...." type="text" value={} onChange={()=>setSearchTextNote(e.target.value)} />
                <i className="fas fa-search"></i>
            </div>
            <div className="searchresults__container">
                <ul>
                    {searchResults? searchResults.map(result => (
                        <li key={result.id}><span>{result.title}</span><span>{result.text}</span></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchDropDown