import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import "./index.css";
import mousepic from "../../images/mouse.png";

const LoginForm = ({
  authenticated,
  setAuthenticated,
  setSignup,
  setLogin,
}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
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
