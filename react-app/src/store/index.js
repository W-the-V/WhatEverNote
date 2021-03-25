import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import sessionReducer from './session'
import notesReducer from "./notes"
import notebooksReducer from "./notebooks"
import tagsReducer from "./tags"
import thunk from "redux-thunk";


const rootReducer = combineReducers({
  session: sessionReducer,
  notes: notesReducer,
  notebooks: notebooksReducer,
  tags: tagsReducer,

});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {

  window.store = store;
}

export default configureStore;
