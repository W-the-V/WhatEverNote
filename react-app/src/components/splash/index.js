import { NavLink, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { login as Login } from "../../services/auth";
import Modal from "react-modal";
import mousePic from "../../images/mouse.png";
import laptopPic from "../../images/laptopEvernote.png";
import "./index.css";
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";
import {useSplash} from "../../context/SplashContext"



const Splash = () => {
  const [quote, setQuote] = useState("forbes")
  const [authenticated, setAuthenticated] = useState(false);
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  Modal.setAppElement("#root");
  const closeSignup = () => {
    setSignup(false);
  };
  const closeLogin = () => {
    if (signup) setSignup(false);
    setLogin(false);
  };
  const openSignup = () => {
    if (login) setLogin(false);
    setSignup(true);
  };
  const openLogin = () => {
    if (signup) setSignup(false);
    setLogin(true);
  };
  const demoLogin = async () => {
    const user = await Login("demo@demo.com", "password");
    setAuthenticated(true);
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
    <>
      <Modal
        isOpen={signup}
        contentLabel="Signup"
        className="defaultInner"
        overlayClassName="defaultOuter"
        onRequestClose={closeSignup}
      >
        <div className="closeIcoOuterShell">
          <button className="closeIcoShell" onClick={(e) => setSignup(false)}>
            <i className="fas fa-times closeIco"></i>
          </button>
        </div>
        <SignUpForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          signup={signup}
          setSignup={setSignup}
          login={login}
          setLogin={setLogin}
        />
      </Modal>
      <Modal
        isOpen={login}
        contentLabel="Login"
        className="defaultInner"
        overlayClassName="defaultOuter"
        onRequestClose={closeLogin}
      >
        <div className="closeIcoOuterShell">
          <button className="closeIcoShell" onClick={(e) => setLogin(false)}>
            <i className="fas fa-times closeIco"></i>
          </button>
        </div>
        <LoginForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          signup={signup}
          setSignup={setSignup}
          login={login}
          setLogin={setLogin}
          openLogin={openLogin}
        />
      </Modal>
      <div className="splash__container">
        <div className="splash__header__container">
          <span className="splash__header1">Accomplish more with</span>
          <span className="splash__header1">better notes</span>
          <span className="splash__header2">
            WhatEverNote helps you capture your ideas and find them fast.
          </span>
          <button className="Sign-up__button" onClick={openSignup}>
            Sign up for free
          </button>
          <button className="Login__button" onClick={openLogin}>
            Already have an account? Log in
          </button>
          <button className="Login__button" onClick={demoLogin}>
            Login as Demo User
          </button>
        </div>
        <div className="splash__section2__container">
          <div className="splash_Image__holder">
            <img src={laptopPic} />
          </div>
          <div className="splash_bullet__container">
            <div className="splash__bullet">
              <span className="splash__bullet__header">WORK ANYWHERE</span>
              <span className="splash__bullet__text">
                Keep important info handy by syncing your notes to all your
                devices.
              </span>
            </div>
            <div className="splash__bullet">
              <span className="splash__bullet__header">
                CAPTURE WHAT MATTERS
              </span>
              <span className="splash__bullet__text">
                Add text, images, audio, scans, PDFs, and documents to your
                notes.
              </span>
            </div>
            <div className="splash__section3__container">
                <div className="splash__green__quote">"</div>
                <div className="splash__quote">
                    {quote === "forbes" ? <span className="splash__quote__text.fade-in">"Such a great App... Whatever"</span> : null}
                    {quote === "inc" ? <span className="splash__quote__text.fade-in">"Another hot review"</span> : null}
                    {quote === "verge" ? <span className="splash__quote__text fade-in">"Verge loves this company"</span> : null}
                    {quote === "business" ? <span>"Business thinks we're  bomb"</span> : null}
                    {quote === "well-good" ? <span>"Another hot review"</span> : null}

                    <span>-An Expert</span>
                </div>
                <div className="splash_mag__container">
                    <ul>
                        <li>FakeMag</li>
                        <li onClick={() => setQuote("forbes")}>FakeMag2</li>
                        <li onClick={() => setQuote("inc")}>FakeMag3</li>
                        <li onClick={() => setQuote("verge")}>FakeMag4</li>
                        <li onClick={() => setQuote("business")}>FakeMag5</li>
                        <li onClick={() => setQuote("well-good")}>FakeMag6</li>
                    </ul>
                </div>

            <div className="splash__bullet">
              <span className="splash__bullet__header">
                YOUR NOTES, YOUR WAY
              </span>
              <span className="splash__bullet__text">
                Express yourself with formatting tools that help you write how
                you think.
              </span>

            </div>
            <div className="splash__bullet">
              <span className="splash__bullet__header">FIND THINGS FAST</span>
              <span className="splash__bullet__text">
                Get what you need, when you need it. Search gives you results as
                you type.
              </span>
            </div>
          </div>
        </div>
        <div className="splash__section3__container">
          <div className="splash__green__quote">"</div>
          <div className="splash__quote">
            <span>"Such a great App... Whatever"</span>
            <span>-An Expert</span>
          </div>
          <div className="splash_mag__container">
            <ul>
              <li>FakeMag</li>
              <li>FakeMag2</li>
              <li>FakeMag3</li>
              <li>FakeMag4</li>
              <li>FakeMag5</li>
              <li>FakeMag6</li>
            </ul>
          </div>
        </div>
        <div className="splash__section4__container">
          <div className="splash__footer__header__container">
            <img src={mousePic} />
            <span>WhatEverNote</span>
          </div>
          <div>I don't know What to put in this chunk</div>
        </div>
      </div>
    </>
  );
};
export default Splash;
