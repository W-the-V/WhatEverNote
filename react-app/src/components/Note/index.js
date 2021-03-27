import React, {useState} from "react";
import { render } from "react-dom";
import {useDispatch} from 'react-redux'
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createNote, editNote, deleteNote }  from "../../store/notes"
import "./index.css";



const CustomHeart = () => <span>♥</span>;

function insertHeart() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "♥");
  this.quill.setSelection(cursorPosition + 1);
}

/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-font">
      <option value="arial" selected>
        Arial
      </option>
      <option value="comic-sans">Comic Sans</option>
      <option value="courier-new">Courier New</option>
      <option value="georgia">Georgia</option>
      <option value="helvetica">Helvetica</option>
      <option value="lucida">Lucida</option>
    </select>
    <select className="ql-size">
      <option value="extra-small">Size 1</option>
      <option value="small">Size 2</option>
      <option value="medium" selected>
        Size 3
      </option>
      <option value="large">Size 4</option>
    </select>
    <select className="ql-align" />
    <select className="ql-color" />
    <select className="ql-background" />
    <button className="ql-clean" />
    <button className="ql-insertHeart">
      <CustomHeart />
    </button>
  </div>
);

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida"
];
Quill.register(Font, true);

/*
 * Editor component with custom toolbar and content containers
 */
function Note(props) {
  const [editorHtml, setEditorHtml] = useState("")
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(editorHtml, "EDITORHTML")
  }

  const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertHeart: insertHeart
      }
    }
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color"
  ];



  
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          value={editorHtml}
          onChange={(e) => setEditorHtml(props.value)}
          placeholder={props.placeholder}
          modules={modules}
          formats={formats}
        />
        <button type="button" onClick={handleSubmit}>Submit</button>
      </div>
    );
}





export default Note