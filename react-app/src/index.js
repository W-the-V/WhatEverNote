import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import SplashContextProvider from './context/SplashContext'
import NoteContextProvider from "./context/NoteContext"
import  TagModalContextProvider from './context/tagModalContext';

const store = configureStore();

function Root() {
  return (
    <SplashContextProvider>
      <TagModalContextProvider>
      <NoteContextProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
      </NoteContextProvider>
      </TagModalContextProvider>
    </SplashContextProvider>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
