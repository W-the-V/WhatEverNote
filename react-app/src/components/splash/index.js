import { NavLink, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import Modal from "react-modal";
import mousePic from "../../images/mouse.png";
import laptopPic from "../../images/splash-hero.png";
import "./index.css";
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";
import { useSplash } from "../../context/SplashContext";
import SplashNav from "../SplashNav";
import SplashSidebar from "../SplashSidebar";

const Splash = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [quote, setQuote] = useState("forbes");
  const [authenticated, setAuthenticated] = useState(false);
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

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
  const demoLogin = () => {
    const user = dispatch(sessionActions.login("demo@demo.com", "password"));
    setAuthenticated(true);
  };
  if (user) {
    return (
      <Redirect
        to="/home"
        // authenticated={authenticated}
        // setAuthenticated={setAuthenticated}
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
        <SplashNav setShowSidebar={setShowSidebar} />
        {showSidebar ? <SplashSidebar setShowSidebar={setShowSidebar} /> : null}
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
            <img style={{imageRendering:"auto"}} alt="logo" src={laptopPic} alt="laptop"/>
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
          <div className="splash__green__quote">
            <img
              alt="logo"
              src="https://evernote.com/c/assets/homepage/homepage-quote.svg?3ec5da84998f74bf"
            />
          </div>
          <div className="splash__quote__container">
            <div className="splash__quote">
              {quote === "forbes" ? (
                <span className="splash__quote__text fade-in">
                  "It feels like there are endless ways to use Evernote… Use it
                  for school, work, life, and beyond."
                </span>
              ) : null}
              {quote === "inc" ? (
                <span className="splash__quote__text fade-in">
                  "Evernote is a powerful tool that can help executives,
                  entrepreneurs and creative people capture and arrange their
                  ideas. All you have to do is use it."
                </span>
              ) : null}
              {quote === "verge" ? (
                <span className="splash__quote__text fade-in">
                  "A few years ago, after my computer broke down and I lost all
                  of the notes I had saved to my desktop, I finally decided to
                  embrace the cloud and download Evernote. Since then, I haven’t
                  looked back."
                </span>
              ) : null}
              {quote === "business" ? (
                <span className="splash__quote__text fade-in">
                  "You can even send emails to Evernote and gather all of the
                  things you need in a single place."
                </span>
              ) : null}
              {quote === "well-good" ? (
                <span className="splash__quote__text fade-in">
                  "Another hot review"
                </span>
              ) : null}

              <span className="splash__quote__expert">
                {quote === "verge" ? (
                  <span className="splash__quote__expert fade-in">- Verge</span>
                ) : null}
                {quote === "forbes" ? (
                  <span className="splash__quote__expert fade-in">
                    - Forbes
                  </span>
                ) : null}
                {quote === "inc" ? (
                  <span className="splash__quote__expert fade-in">- Inc.</span>
                ) : null}
                {quote === "business" ? (
                  <span className="splash__quote__expert fade-in">
                    - Entreprenuer
                  </span>
                ) : null}
                {quote === "well-good" ? (
                  <span className="splash__quote__expert fade-in">
                    - well + good
                  </span>
                ) : null}
              </span>
            </div>
            <div className="splash_mag__container">
              <ul className="splash__quote__container">
                <li
                  className="splash__quote__text"
                  onClick={() => setQuote("forbes")}
                >
                  <img
                    alt="logo"
                    className="splash__quote__img"
                    src="https://evernote.com/c/assets/homepage/forbes-active.png?3bffacb93d68b1fe"
                  />
                </li>
                <li
                  className="splash__quote__text"
                  onClick={() => setQuote("verge")}
                >
                  <img
                    alt="logo"
                    className="splash__quote__img"
                    src="https://evernote.com/c/assets/homepage/the-verge_active.png?5312a2b3e103696e"
                  />
                </li>
                <li
                  className="splash__quote__text"
                  onClick={() => setQuote("inc")}
                >
                  <img
                    alt="logo"
                    className="splash__quote__img"
                    src="https://evernote.com/c/assets/homepage/logo-inc-active.png?e993cb33e525ac88"
                  />
                </li>
                <li
                  className="splash__quote__text"
                  onClick={() => setQuote("business")}
                >
                  <img
                    alt="logo"
                    className="splash__quote__img"
                    src="https://evernote.com/c/assets/homepage/entrepreneur-magazine_active.png?b72e18e9aff09af"
                  />
                </li>
                <li
                  className="splash__quote__text"
                  onClick={() => setQuote("well-good")}
                >
                  <img
                    alt="logo"
                    className="https://evernote.com/c/assets/homepage/well-good_active.png?a7ef647d41985ecb"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="splash__feature__container">
          <div className="splash__feature__text">
            <img
              alt="logo"
              src="https://evernote.com/c/assets/homepage/integrations.svg?32b746ff5f7b7812"
            />
            <h3>App Integrations</h3>
            <p className="splash__feature__desc">
              Share content across apps. Evernote connects with the productivity
              tools you already use, so you can work your way.
            </p>
            <div>
              <p>LEARN MORE →</p>
            </div>
          </div>
          <div className="splash__feature__img">
            <img
              alt="logo"
              className="splash__feature__img"
              src="https://evernote.com/c/assets/homepage/feature_integration@2x.png?be711b55a9463ad8"
            />
          </div>
        </div>
        <div className="splash__feature__container">
          <div className="splash__feature__img">
            <img
              alt="logo"
              className="splash__feature__img"
              src="https://evernote.com/c/assets/homepage/feature_document_scanning_@2x__en.png?296e238420ad2fe3"
            />
          </div>
          <div className="splash__feature__text">
            <img
              alt="logo"
              src="https://evernote.com/c/assets/homepage/doc-scanning.svg?54e07b63a6988c1e"
            />
            <h3>Document Scanning</h3>
            <p className="splash__feature__desc">
              Go paperless. Back up important documents to all your devices, and
              keep the information—not the clutter.
            </p>
            <div>
              <p>LEARN MORE →</p>
            </div>
          </div>
        </div>
        <div className="splash__feature__container">
          <div className="splash__feature__text">
            <img
              alt="logo"
              src="https://evernote.com/c/assets/homepage/web-clipping.svg?7b31cc4e08aca215"
            />
            <h3>Web Clipper</h3>
            <p className="splash__feature__desc">
              Save web pages (without the ads) and mark them up with arrows,
              highlights, and text to make them more useful.
            </p>
            <div>
              <p>LEARN MORE →</p>
            </div>
          </div>
          <div className="splash__feature__img">
            <img
              alt="logo"
              className="splash__feature__img"
              src="https://evernote.com/c/assets/homepage/feature_web_clipper_@2x__en.png?3c3112a70c9a24e2"
            />
          </div>
        </div>
        <div className="splash__feature__container">
          <div className="splash__feature__img">
            <img
              alt="logo"
              className="splash__feature__img"
              src="https://evernote.com/c/assets/homepage/feature_mobile_@2x__en.png?9f3c59ae5a97b50"
            />
          </div>
          <div className="splash__feature__text">
            <img
              alt="logo"
              src="https://evernote.com/c/assets/homepage/rich_notes.svg?4be8ba71638c18bb"
            />
            <h3>Rich Notes</h3>
            <p className="splash__feature__desc">
              Express ideas, capture images, and record audio in meetings or
              lectures, all from your phone or tablet—even if you’re offline.
            </p>
            <div>
              <p>LEARN MORE →</p>
            </div>
          </div>
        </div>

        <div className="splash__section4__container">
          <div
            style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
          >
            <div className="splash__footer__header__container">
              <img alt="logo" style={{ maxWidth: "75px" }} src={mousePic} />
              <div>
                <span>WhatEvernote</span>
              </div>
            </div>
        </div>
        <hr style={{height:"3px",border:"none",color:"#333",backgroundColor:"#333"}}></hr>
        </div>
      </div>
    </>
  );
};
export default Splash;
