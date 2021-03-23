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

            {/* <div className="splash__section3__container">
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
            </div> */}
          </div>
        </div>
        <div className="splash__section3__container">

          <div className="splash__green__quote"><img src="https://evernote.com/c/assets/homepage/homepage-quote.svg?3ec5da84998f74bf"/></div>
        <div className="splash__quote__container">
          <div className="splash__quote">
                    {quote === "forbes" ? <span className="splash__quote__text fade-in">"It feels like there are endless ways to use Evernote… Use it for school, work, life, and beyond."</span> : null}
                    {quote === "inc" ? <span className="splash__quote__text fade-in">"Evernote is a powerful tool that can help executives, entrepreneurs and creative people capture and arrange their ideas. All you have to do is use it."</span> : null}
                    {quote === "verge" ? <span className="splash__quote__text fade-in">"A few years ago, after my computer broke down and I lost all of the notes I had saved to my desktop, I finally decided to embrace the cloud and download Evernote. Since then, I haven’t looked back."</span> : null}
                    {quote === "business" ? <span className="splash__quote__text fade-in">"You can even send emails to Evernote and gather all of the things you need in a single place."</span> : null}
                    {quote === "well-good" ? <span className="splash__quote__text fade-in">"Another hot review"</span> : null}

            <span className="splash__quote__expert">
                {quote === "verge" ? <span className="splash__quote__expert fade-in">- Verge</span> : null}
                {quote === "forbes" ? <span className="splash__quote__expert fade-in">- Forbes</span> : null}
                {quote === "inc" ? <span className="splash__quote__expert fade-in">- Inc.</span> : null}
                {quote === "business" ? <span className="splash__quote__expert fade-in">- Entreprenuer</span> : null}
                {quote === "well-good" ? <span className="splash__quote__expert fade-in">- well + good</span> : null}           
            </span>
          </div>
          <div className="splash_mag__container">
            <ul className="splash__quote__container">
                        <li className="splash__quote__text" onClick={() => setQuote("forbes")}><img className="splash__quote__img" src="https://evernote.com/c/assets/homepage/forbes-active.png?3bffacb93d68b1fe"/></li>
                        <li className="splash__quote__text" onClick={() => setQuote("verge")}><img className="splash__quote__img" src="https://evernote.com/c/assets/homepage/the-verge_active.png?5312a2b3e103696e"/></li>
                        <li className="splash__quote__text" onClick={() => setQuote("inc")}><img className="splash__quote__img" src="https://evernote.com/c/assets/homepage/logo-inc-active.png?e993cb33e525ac88"/></li>
                        <li className="splash__quote__text" onClick={() => setQuote("business")}><img className="splash__quote__img" src="https://evernote.com/c/assets/homepage/entrepreneur-magazine_active.png?b72e18e9aff09af"/></li>
                        <li className="splash__quote__text" onClick={() => setQuote("well-good")}><img className="https://evernote.com/c/assets/homepage/well-good_active.png?a7ef647d41985ecb"/></li>
            </ul>
          </div>
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
