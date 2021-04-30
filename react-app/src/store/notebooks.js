import * as deepcopy from "deepcopy";
const GET_NOTEBOOKS = "notes/GET_NOTEBOOKS";
const REMOVE_NOTEBOOK = "notes/REMOVE_NOTEBOOK";
const UPDATE_NOTEBOOK = "notes/UPDATE_NOTEBOOK";
const ADD_NOTEBOOK = "notes/ADD_NOTEBOOK";

const get = (notebooks) => ({
  type: GET_NOTEBOOKS,
  notebooks,
});

const update = (notebook) => ({
  type: UPDATE_NOTEBOOK,
  notebook,
});

const add = (notebook) => ({
  type: ADD_NOTEBOOK,
  notebook,
});

const remove = (notebookId) => ({
  type: REMOVE_NOTEBOOK,
  notebookId,
});

export const getNotebooks = (userId) => async (dispatch) => {
  const response = await fetch(`/api/user/${userId}/notebooks`);

  if (response.ok) {
    const data = await response.json();
    dispatch(get(data.notebooks));
    return data;
  }
};

export const createNotebook = (data, userId) => async (dispatch) => {
  const response = await fetch(`/api/user/${userId}/notebooks`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const notebook = await response.json();
    dispatch(add(notebook));
    return notebook;
  }
};

export const updateNotebooks = (data) => async (dispatch) => {
  const response = await fetch(
    `/api/user/${data.user_id}/notebooks/${data.id}`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (response.ok) {
    const notebooks = await response.json();
    dispatch(update(notebooks));
    return notebooks;
  }
};

export const deleteNotebooks = (notebookId, user_id) => async (dispatch) => {
  const response = await fetch(`/api/user/${user_id}/notebooks/${notebookId}`, {
    method: "delete",
  });

  if (response.ok) {
    const notebook = await response.json();
    dispatch(remove(notebook.id, notebook.userId));
  }
};

const initialState = {};
let newState;
const notebooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTEBOOKS: {
      newState = deepcopy(state);
      newState.notebooks = action.notebooks;
      return newState;
    }
    case REMOVE_NOTEBOOK: {
      const newState = { ...state };
      delete newState[action.noteId];
      return newState;
    }
    case ADD_NOTEBOOK:
    case UPDATE_NOTEBOOK: {
      return {
        ...state,
        [action.notebook.id]: action.notebook,
      };
    }
    default:
      return state;
  }
};

export default notebooksReducer;
