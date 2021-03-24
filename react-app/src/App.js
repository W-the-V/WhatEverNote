import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import {useDispatch, useSelector} from 'react-redux'
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import Home from "./components/Home";
import Splash from "./components/splash";
import Whywhatevernote from "./components/Whywhatevernote";
import ScratchPad from "./components/ScratchPad";
import Note from "./components/Note";
import LogoutButton from "./components/auth/LogoutButton";


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session);
  useEffect(() => {
    (async () => {
      if (user && !user.errors) {
        console.log(user)
        setAuthenticated(true);
        console.log("this is authenticated", authenticated)
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {(authenticated)?<NavBar setAuthenticated={setAuthenticated} />:null}
      
      <Switch>
        <Route path="/" exact={true}>
          <Splash />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/logout">
          <LogoutButton />
        </Route>
        <Route path="/whywhatevernote" >
          <Whywhatevernote />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <ProtectedRoute
          path="/users"
          exact={true}
          authenticated={authenticated}
        >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute
          path="/users/:userId"
          exact={true}
          authenticated={authenticated}
        >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/home" exact={true}  authenticated={authenticated}>
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/note" exact={true} authenticated={authenticated}>
          <Note placeholder={"Write something or insert a heart ♥"}/>
        </ProtectedRoute>
      </Switch>
      <Route exact path="/test">
        <ScratchPad />
      </Route>
    </BrowserRouter>
  );
}

export default App;
