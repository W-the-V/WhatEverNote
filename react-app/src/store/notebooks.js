const GET_NOTEBOOKS = "notes/GET_NOTEBOOKS";
const REMOVE_NOTEBOOK = "notes/REMOVE_NOTEBOOK";
const UPDATE_NOTEBOOK = "notes/UPDATE_NOTEBOOK";
const ADD_NOTEBOOK = "notes/ADD_NOTEBOOK";

const get = (userId) => ({
  type: LOAD_NOTEBOOKS,
  userId,
  notebooks,
});

const update = (notebook) => ({
  type: UPDATE_NOTEBOOKS,
  notebook,
});

const add = (notebook) => ({
  type: ADD_NOTEBOOKS,
  notebook,
});

const remove = (userId, notebookId) => ({
  type: REMOVE_NOTEBOOKS,
  notebookId,
  userId,
});

export const getNotebooks = (userId) => async (dispatch) => {
  const response = await fetch(`/api/user/${userId}/notebooks`);

  if (response.ok) {
    const data = await response.json();
    dispatch(get(data.notebooks));
    return response;
  }
};

export const createNotebooks = (data, userId) => async (dispatch) => {
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
  const response = await fetch(`/api/notebooks/${data.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const notebooks = await response.json();
    dispatch(update(notebooks));
    return notebooks;
  }
};

export const deleteNotebooks = (notebookId) => async (dispatch) => {
  const response = await fetch(`/api/notebooks/${notebookId}`, {
    method: "delete",
  });

  if (response.ok) {
    const notebook = await response.json();
    dispatch(remove(notebook.id, notebook.userId));
  }
};

const initialState = {};

const notebooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTEBOOKS: {
      const newNotebooks = {};
      action.Notebooks.forEach((notebook) => {
        newNotebooks[notebook.id] = notebook;
      });
      return {
        ...state,
        ...newNotebooks,
      };
    }
    case REMOVE_NOTE: {
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
