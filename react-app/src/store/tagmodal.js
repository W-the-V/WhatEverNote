const TAG_ACTIVATE = "tags/activate";
const TAG_DEACTIVATE = "tags/deactivate";

export const activateTagModal = () => {
  return {
    type: TAG_ACTIVATE,
  };
};
export const deactivateTagModal = () => {
  return {
    type: TAG_DEACTIVATE,
  };
};

const initialState = { status: false };
const tagModalReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case TAG_ACTIVATE:
      newState = Object.assign({}, state, { status: true });
      return newState;
    case TAG_DEACTIVATE:
      newState = Object.assign({}, state, { status: false });
      return newState;
    default:
      return state;
  }
};
export default tagModalReducer;
