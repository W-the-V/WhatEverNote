import React, {useState} from "react";
import { render } from "react-dom";
import {useDispatch} from 'react-redux'
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createNote, editNote, deleteNote }  from "../../store/notes"
import "../Note/index.css"
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
<<<<<<< HEAD:react-app/src/components/Note/index.js
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
=======
  <div id="toolbar" className="toolbar">
  
<span class="ql-formats">
<button className="ql-undo">
        <CustomUndo />
      </button>
<select class="ql-font">
        <option selected>Sans Serif</option>
        <option value="inconsolata">Inconsolata</option>
        <option value="mirza">Mirza</option>
        <option value="arial">Arial</option>
</select>
</span>


<span class="ql-formats">
<select class="ql-size"></select>
<button class="ql-bold"></button>
<button class="ql-italic"></button>
<button class="ql-underline"></button>
<select class="ql-color"></select>
<button class="ql-header" value="1"></button>
{/* <button class="ql-header" value="2"></button> */}
<button class="ql-blockquote"></button>
{/* <button class="ql-strike"></button> */}
</span>



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
>>>>>>> origin/SaturdayRhea:react-app/src/components/NotePage/note.js
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
  "mirza",
  "sans serif",
  "inconsolata",
];
Quill.register(Font, true);

// const FontStyle = Quill.import('attributors/style/font');
// Quill.register(FontStyle, true);

function Note(props) {

  const [editorHtml, setEditorHtml] = useState("...")
  
  const handleSubmit = (e) => {
    e.preventDefault()
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
        <div className="editor__container">
        <ReactQuill
          value={editorHtml}
          onChange={(e) => setEditorHtml(Quill.state?.value)}
          placeholder={props.placeholder}
          modules={modules}
          formats={formats}
        />
<<<<<<< HEAD:react-app/src/components/Note/index.js
        <button type="button" onClick={handleSubmit}>Submit</button>
=======
        </div>
        <div className="editor-footer">
          <div className="footer__save__text">
            <p>all changes saved.</p>
          </div>
          <div className="footer-right">
            <button className="footer__button" type="button"><p className="Footer_button_text">New Note <i className="fas fa-caret-down"></i></p></button>
          </div>
        </div>
>>>>>>> origin/SaturdayRhea:react-app/src/components/NotePage/note.js
      </div>
    );
}






export default Note