const GET_NOTES = "notes/GET_NOTES";
const REMOVE_NOTE = "notes/REMOVE_NOTE";
const UPDATE_NOTE = "notes/UPDATE_NOTE";
const ADD_NOTE = "notes/ADD_NOTE";

const get = (userId, noteId) => ({
  type: LOAD_NOTES,
  userId,
  notes,
});

const update = (note) => ({
  type: UPDATE_NOTES,
  note,
});

const add = (note) => ({
  type: ADD_NOTES,
  note,
});

const remove = (userId, noteId) => ({
  type: REMOVE_NOTES,
  noteId,
  userId,
});

export const getNotes = (id) => async (dispatch) => {
  const response = await fetch(`/api/user/${id}/notes`);

  if (response.ok) {
    const notes = await response.json();
    dispatch(load(notes, id));
  }
};

export const createNotes = (data, userId) => async (dispatch) => {
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

export const updateNotes = (data) => async (dispatch) => {
  const response = await fetch(`/api/notes/${data.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const notes = await response.json();
    dispatch(update(notes));
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

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES: {
      const newNotes = {};
      action.Notes.forEach((note) => {
        newNotes[note.id] = note;
      });
      return {
        ...state,
        ...newNotes,
      };
    }
    case REMOVE_NOTE: {
      const newState = { ...state };
      delete newState[action.noteId];
      return newState;
    }
    case ADD_note:
    case UPDATE_note: {
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
