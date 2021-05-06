import * as deepcopy from "deepcopy"
const GET_TAGS = "tags/GET_TAGS";
const ADD_TAG = "tags/ADD_TAG";
const ADD_TAG_TO_NOTE = "tags/ADD_TAG_TO_NOTE";

const get = (tags) => ({
    type: GET_TAGS,
    tags,
  });
const add = (tag) => ({
  type: ADD_TAG,
  tag
})
const addNotetoTag = (tag) => ({
  type: ADD_TAG_TO_NOTE,
  tag
})

export  const getTags = (id) => async (dispatch) => {
    const response = await fetch(`/api/user/${id}/tags`);
  
    if (response.ok) {
      const tags = await response.json();
      dispatch(get(tags));
    }
  };
  export const createTag = (data, userId) => async (dispatch) => {
    const response = await fetch(`/api/user/${userId}/tags`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      const tag = await response.json();
      dispatch(add(tag));
      return tag;
    }
  };
  export const createNoteToTag = (data, userId) => async (dispatch) => {
    const response = await fetch(`/api/user/${userId}/tags/${data.id}/note`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      const tag = await response.json();
      dispatch(addNotetoTag(tag));
      return tag;
    }
  };
  

  const initialState = {};
  let newState;
  const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_TAGS: {
        newState= deepcopy(state);
        newState.tags = action.tags
        return newState
      }
      case ADD_TAG: {
        newState = deepcopy(state)
        let tags = state.tags.tags
        tags.push(action.tag)
        newState.tags.tags = tags
        return newState
      }
      
      
      default:
        return state;
    }
  };
  export default tagsReducer