import * as deepcopy from "deepcopy"
const GET_TAGS = "notes/GET_TAGS";

const get = (tags) => ({
    type: GET_TAGS,
    tags,
  });

export  const getTags = (id) => async (dispatch) => {
    const response = await fetch(`/api/user/${id}/tags`);
  
    if (response.ok) {
      const tags = await response.json();
      dispatch(get(tags));
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
      
      default:
        return state;
    }
  };
  export default tagsReducer