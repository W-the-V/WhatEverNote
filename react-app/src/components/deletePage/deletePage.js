import React from "react";
import { useSelector } from "react-redux"
import {useDispatch} from "react-redux"
import { useHistory } from "react-router-dom"
import "./index.css"
import { createNote } from "../../store/notes"
const DeletePage = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    
    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return {};
    }
    let deletedItems =JSON.parse(getCookie(`${user.id}DeletedNotes`))
    
    const restoreItem = async (item) =>{
        delete deletedItems[item.id]
        function setCookie(cname, cvalue, exdays) {
          var d = new Date();
          d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
          var expires = "expires="+d.toUTCString();
          document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
        setCookie(`${user.id}DeletedNotes`, JSON.stringify(deletedItems), 30 )
        let restoredNote = {Title:item.title, Text:item.text, notebook_id: item.notebook_id}
        let newNote = await dispatch(createNote(restoredNote,user.id))
        history.push(`/notes/${newNote.id}`)
    }
    return (
      <div className="Deleted-Note-Page__container">
            <h1>Trash</h1>
            <div className="deleted-notes">
            {deletedItems? Object.keys(deletedItems).map( item => (
                <div className="deletedItem" key={deletedItems[item].id}>
                    <span>{deletedItems[item].title}</span>
                    <p>{deletedItems[item].text}</p>
                    <span onClick={()=>restoreItem(deletedItems[item])}>Restore Note</span>
                </div>
            )):<span>You have no items in your trash</span>}
            </div>
        </div>
    )

}
export default DeletePage