import React, { useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../services/auth";
import mousepic from "../../images/mouse.png";

const SignUpForm = ({
  authenticated,
  setAuthenticated,
  setSignup,
  setLogin,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };
  const loginButton = () => {
    setSignup(false);
    setLogin(true);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
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

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form_container">
      <div className="login-page_header__container">
        <img src={mousepic} />
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
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={updateUsername}
            value={username}
          ></input>
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
