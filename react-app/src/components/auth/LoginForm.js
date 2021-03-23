import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import * as sessionActions from '../../store/session'
// import { login } from "../../services/auth";
import "./index.css";
import mousepic from "../../images/mouse.png";

const LoginForm = ({
  authenticated,
  setAuthenticated,
  setSignup,
  setLogin,
}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);

  if (user) {
    console.log("THERE S A USE")
      // dispatch(getNotebooks)
      // dispatch our get-all-things from the store
      // all user information and update the store
      //get all of the notebooks associated w user
      //get all notes associated with user 
      // setAuthenticated true? 
    
    return (
    <Redirect to="/home"/>
  )}

  const onLogin = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login(email, password))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors)
      })
    
    
  };
  const signupButton = () => {
    setLogin(false);
    setSignup(true);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    // dispatch our get-all-things from the store
      // all user information and update the store
      //get all of the notebooks associated w user
      //get all notes associated with user 
      //
    return (
      <Redirect
        to="/home"
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
    );
  }


  return (
    <div className="form_container">
      <div className="login-page_header__container">
        <img src={mousepic} />
        <span className="login_whatever">WhatEverNote</span>
        <span>Remember whatever's important.</span>
      </div>

      <form classname="login_form" onSubmit={onLogin}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          {/* <label htmlFor="email">Email</label> */}
          <input
            name="email"
            type="text"
            placeholder="Email address"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          {/* <label htmlFor="password">Password</label> */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button className="form__button" type="submit">
          Continue
        </button>
      </form>
      <div className="login_footer__container">
        <div className="Remember_me__holder">
          <input type="checkbox" />
          <label> Remember me for 30 days</label>
        </div>
        <div className="donthaveaccount__holder">
          <span>Don't have an account?</span>
          <button className="Login__button" onClick={signupButton}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
