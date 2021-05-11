![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
<h1 align="center"> Whatevernote: <i>An Evernote Clone</i></h1>

<p align="center">Whatevernote is a pixel-perfect clone of Evernote.com, with React Quill. Create sortable notes and notebooks. Customize your creations with the React Quill text editor toolbar. 
    <br />
    <a href="https://github.com/W-the-V/WhatEverNote"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://whatevernote-app.herokuapp.com/">View Site</a>
    ·
    <a href="https://github.com/W-the-V/WhatEverNote/issues">Report Bug</a>
    ·
    <a href="https://github.com/W-the-V/WhatEverNote/issues">Request Feature</a>
  </p>

<p align="center">
  <img src="images/helloworld.gif" />
</p>

## About this project

<h2 align="center"> Create Notes</h3>
<p align="center">
  <img src="images/addnote.gif" />
</p>

<h2 align="center"> Create Notebooks</h3>
<h4 align="center">New notebooks are created with a default first note.</h4>

<p align="center">
  <img src="images/newnotebook.gif" />
</p>

<h2 align="center">Edit notes</h2>
<h4 align="center">Notes are saved in the database as HTML strings. Images are converted to base64 encoded blob strings and save on the database as well. </h4>

<p align="center">
  <img src="images/addphoto.gif" />
</p>

<h2 align="center">Autosave Notes</h2>
<h4 align="center">Using focus and blur, notes are autosaved to the Redux Store and posted to the database upon logout.</h4>

<p align="center">
  <img src="images/autosavenote.gif" />
</p>

<h2 align="center">Delete Notes</h2>
<h4 align="center">Deleted notes are stored in the trash as a cookie for 30 days.</h4>
<p align="center">
  <img src="images/deletenote.gif" />
</p>
* Autosave for React Quill - coming soon as a package to npmjs.com

### Folder Structure

    .
    ├── dev-requirements.txt
    ├── requirements.txt            
    ├── Dockerfile                  # Instructions to create image layer                   
    ├── Pipfile                     
    ├── Pifile.lock                  
    ├── README.md
    ├── app                         # Python & Flask backend folder
    ├── react-app                   # React with Redux frontend folder
    ├── images
    
 



   
   ## Run From Source
**Use these commands install and run the development version of Whavernote:**
<br>
#### `git clone https://github.com/W-the-V/WhatEverNote.git`
<br>
<img src="https://media.giphy.com/media/g1DML46NGSibBTdF6P/giphy.gif">

#### `cd app`

#### `flask run`

#### `cd ..`

#### `cd react-app`

#### `npm start`

# Code Highlights
<details>
  <summary>Notebook API Routes</summary>
  
```
#------------------------------------------------------------------------------
#                         Notebook Operation Functions
#------------------------------------------------------------------------------

def get_one_notebook(notebook_id):
    notebook = Notebook.query.filter_by(id = notebook_id).first()
    return notebook

def get_all_notebooks(user_id):
    notebooks = Notebook.query.filter_by(user_id = user_id).all()
    return jsonify({"notebooks": [notebook.to_dict() for notebook in notebooks]})

def add_notebook(user_id):
    notebook_data = json.loads(request.data.decode("utf-8"))

    notebook = Notebook(name = notebook_data,
                        user_id = current_user.id)
    
    db.session.add(notebook)
    db.session.commit()
    return jsonify(notebook.to_dict())

def delete_notebook(notebook_id):
    notebook = Notebook.query.filter_by(id = notebook_id).first()
    db.session.delete(notebook)
    db.session.commit()
    return jsonify({"message": "Notebook successfully deleted"})

def edit_notebook(notebook_id):
    edit_notebook_data = json.loads(request.data.decode("utf-8"))
    notebook = get_one_notebook(notebook_id)
    print(edit_notebook_data)
    if notebook.name is not edit_notebook_data["name"]:
        notebook.name = edit_notebook_data["name"]
    if notebook.user_id is not edit_notebook_data["user_id"]:
        notebook.user_id = edit_notebook_data["user_id"]
    
    notebook.default_notebook = edit_notebook_data["default_notebook"]
    
    db.session.commit()
    return jsonify(notebook.to_dict())
    
#------------------------------------------------------------------------------
#                    RESTful Routes -- Notebooks
#------------------------------------------------------------------------------

#get_all
#add_notebook
@notebook_routes.route("/notebooks", methods=['GET', 'POST'])
def get_or_add_notebooks(user_id):
    if request.method == 'GET':
        return get_all_notebooks(user_id)
    elif request.method == 'POST':
        return add_notebook(user_id)

#delete
@notebook_routes.route("/notebooks/<int:notebook_id>", methods = ['DELETE'])
def delete_user_note(user_id, notebook_id):
    return delete_notebook(notebook_id)

#edit
@notebook_routes.route("/notebooks/<int:notebook_id>", methods=['PUT'])
def edit_user_notebook(user_id, notebook_id):
    return edit_notebook(notebook_id)


```
</details>
<details>
  <summary>Tag Model</summary>
  
  ```
  
  class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(30), nullable=True)
    notes = db.relationship("Note", back_populates='tags',
                           secondary="notes_to_tags")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
        }

    def other_to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "notes": [note.to_dict() for note in self.notes]
        }

  
  ```
  
 </details>
 
 <details>
    <summary>Note Redux Store</summary>
 
 ```
 import * as deepcopy from "deepcopy";
const GET_NOTES = "notes/GET_NOTES";
const REMOVE_NOTE = "notes/REMOVE_NOTE";
const EDIT_NOTE = "notes/EDIT_NOTE";
const ADD_NOTE = "notes/ADD_NOTE";
const SAVE_NOTE = "notes/SAVE_NOTE";

const get = (notes) => ({
  type: GET_NOTES,
  notes,
});

const edit = (note) => ({
  type: EDIT_NOTE,
  note,
});

const add = (note) => ({
  type: ADD_NOTE,
  note,
});

export const saveNote = (note) => ({
  type: SAVE_NOTE,
  note,
});

const remove = (userId, noteId) => ({
  type: REMOVE_NOTE,
  noteId,
  userId,
});


export const getNotes = (userId) => async (dispatch) => {
  const response = await fetch(`/api/user/${userId}/notes`);

  if (response.ok) {
    const notes = await response.json();
    dispatch(get(notes));
  }
};

export const createNote = (data, userId) => async (dispatch) => {
  const response = await fetch(`/api/user/${userId}/notes`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const note = await response.json();
    dispatch(add(note));
    return note;
  }
};

export const editNote = (data) => async (dispatch) => {
  const response = await fetch(`/api/user/${data.user_id}/notes/${data.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const notes = await response.json();
    dispatch(edit(notes));
    return notes;
  }
};

export const deleteNote = (userId, noteId) => async (dispatch) => {
  const response = await fetch(`/api/user/${userId}/notes/${noteId}`, {
    method: "delete",
  });

  if (response.ok) {
    const note = await response.json();
    dispatch(remove(note.id, note.userId));
  }
};

const initialState = {};
let newState;
const notesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NOTES: {
      newState = deepcopy(state);
      newState = action.notes;
      return newState;
    }
    case REMOVE_NOTE: {
      const newState = { ...state };
      delete newState[action.noteId];
      return newState;
    }
    case SAVE_NOTE: {
      const newState = deepcopy(state);
      newState.savedNote = action.note;
      return newState;
    }
    case EDIT_NOTE: {
      return action.note
      
    }
    default:
      return state;
  }
};

export default notesReducer;

```
 
 </details>
 
## Contributions? - *Autosave Package Coming Soon* 
Want to contribute to Whatevernote? We're working on an open source release of our autosave functionality for use in all React Quill products. Create an issue to get started. 
  
## Database - *Flask & SQLAlchemy*

<p align="center">
  <img src="https://github.com/W-the-V/EverNoteClone/raw/main/images/pythonschema.png" />
</p>

  
