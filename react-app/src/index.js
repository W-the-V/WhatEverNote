import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SplashContextProvider, { SplashContext } from './context/SplashContext'

function Root() {
  return (
    <SplashContextProvider>
      <App />
    </SplashContextProvider>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
