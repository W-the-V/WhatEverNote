import React, { useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
// import { signUp } from "../../services/auth";
import * as sessionActions from '../../store/session'
import { createNotebook } from "../../store/notebooks"
import mousepic from "../../images/mouse.png";

const SignUpForm = ({
  authenticated,
  setAuthenticated,
  setSignup,
  setLogin,
}) => {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user);


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
    let successfulSignUp = await dispatch(sessionActions.signUp(username, firstName, lastName, email, password))
        .catch(async (res) => {
          console.log("THIS IS RES", res)
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors)
        })
        setErrors(successfulSignUp)
      }
  };
  if (user) {
    dispatch(createNotebook("first_Notebook",user.id))
    return (
    <Redirect to="/home"/>
  )}

  const loginButton = () => {
    setSignup(false);
    setLogin(true);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const errorCheck = {} 
  
    errors.forEach(error => { 
    error = error.split(':') 
    errorCheck[error[0].trim()] = error[1]

  })




  // if (authenticated) {
  //   return (
  //     <Redirect
  //       to="/home"
  //       authenticated={authenticated}
  //       setAuthenticated={setAuthenticated}
  //     />
  //   );
  // }

  return (
    <div className="form_container">
      <div className="login-page_header__container">
        <img alt="logo" src={mousepic} />
        <span className="login_whatever">WhatEverNote</span>
        <span>Remember whatever's important.</span>
      </div>

      <form onSubmit={onSignUp} className="signup_form">
        <div>
          {/* <label>User Name</label> */}
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={updateFirstName}
            value={firstName}
          ></input>
          {"firstName" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.firstName}</p></div> : null}
  
        </div>
        <div>
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={updateLastName}
            value={lastName}
          ></input>
          {"lastName" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.lastName}</p></div> : null}

        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={updateUsername}
            value={username}
          ></input>
          {"username" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.username}</p></div> : null}

        </div>
        <div>
          {/* <label>Email</label> */}
          <input
            placeholder="Email"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
          {"email" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.email}</p></div> : null}

        </div>
        <div>
          {/* <label>Password</label> */}
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          {/* <label>Repeat Password</label> */}
          <input
            placeholder="Confirm Password"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button className="form__button" type="submit">
          Continue
        </button>
      </form>
      <div className="login_footer__container">
        <div className="terms_of_service">
          <p>
            By creating an account, you are agreeing to our{" "}
            <span>Terms of Service</span> and <span>Privacy Policy</span>
          </p>
        </div>
        <div className="donthaveaccount__holder">
          <span>Already have an account?</span>
          <button className="Login__button" onClick={loginButton}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
