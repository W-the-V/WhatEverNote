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


const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

function undoChange() {
  this.quill.history.undo();
}

function redoChange() {
  this.quill.history.redo();
}
/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar" className="toolbar">
  
<span class="ql-formats">
<button className="ql-undo">
        <CustomUndo />
      </button>
<select class="ql-font">
        <option selected>Sans Serif</option>
        <option value="inconsolata">Inconsolata</option>
        <option value="roboto">Roboto</option>
        <option value="mirza">Mirza</option>
        <option value="arial">Arial</option>
</select>
<select class="ql-size"></select>
</span>
<span class="ql-formats">
<button class="ql-bold"></button>
<button class="ql-italic"></button>
<button class="ql-underline"></button>
<select class="ql-color"></select>
{/* <button class="ql-strike"></button> */}
</span>

<button class="ql-header" value="1"></button>
<button class="ql-header" value="2"></button>
<button class="ql-blockquote"></button>

<span class="ql-formats">
<button class="ql-list" value="ordered"></button>
<button class="ql-list" value="bullet"></button>
<button class="ql-indent" value="-1"></button>
<button class="ql-indent" value="+1"></button>
</span>
<span class="ql-formats">
<button class="ql-direction" value="rtl"></button>
<select class="ql-align"></select>
</span>
<span class="ql-formats">
<button class="ql-link"></button>
<button class="ql-image"></button>
<button class="ql-video"></button>

</span>

{/* <select className="ql-insertCustomTags">
      <option value="1">One</option>
      <option value="2">Two</option>
    </select> */}
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
        insertHeart: insertHeart,
        undo: undoChange

      }
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
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
        <div className="editor-footer">
          <p>Add tag</p>
          <div className="footer-right">
            <button className="footer__button" type="button"><p className="Footer_button_text">New Note</p></button>
          </div>
        </div>
      </div>
    );
}





export default Note