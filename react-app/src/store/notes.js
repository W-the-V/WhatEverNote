import * as deepcopy from "deepcopy"
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

export const saveNote = (note) =>({
  type: SAVE_NOTE,
  note,
})

const remove = (userId, noteId) => ({
  type: REMOVE_NOTE,
  noteId,
  userId,
});
// /api/user/<int:id>/notes
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
  const response = await fetch(`/api/notes/${data.id}`, {
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

export const deleteNote = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
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
      newState= deepcopy(state);
      newState = action.notes
      return newState
    }
    case REMOVE_NOTE: {
      const newState = { ...state };
      delete newState[action.noteId];
      return newState;
    }
    case SAVE_NOTE: {
      const newState = deepcopy(state)
      newState.savedNote = action.note
      return newState
    }
    case EDIT_NOTE: {
      return {
        ...state,
        [action.note.id]: action.note,
      };
    }
    default:
      return state;
  }
};

export default notesReducer;
