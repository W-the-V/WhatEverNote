import React, {useState} from "react"
import WhyThumbnail from "../WhyThumbnail"
import SplashNav from "../SplashNav"
import SplashSidebar from "../SplashSidebar"
import DevBio from "../DevBio";
import Modal from "react-modal";
import * as sessionActions from '../../store/session'
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";
import capture from "../../images/captureIcon.png"
import together from "../../images/togetherIcon.png"
import fast from "../../images/fastIcon.png"
import personalize from "../../images/personalizeIcon.png"
import homeImage from "../../images/home-screenshot.png"
import "./index.css"
import { useDispatch, useSelector } from "react-redux";
const Whywhatevernote = () => {
    // const [showSidebar, setShowSidebar] = useState(false)

    const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [quote, setQuote] = useState("forbes")
  const [authenticated, setAuthenticated] = useState(false);
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false)

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
    const user =  dispatch(sessionActions.login("demo@demo.com", "password"));
    setAuthenticated(true);
  };

    const whyList = [{title:"Take Notes",text:"Create, read, update, delete notes.", url:capture },{title:"Keep it Together",text:" Organize your notes into Notebooks. Create a personal space for all your ideas and information", url:together},{title:"Find it Fast",text:"Get the right note, right away with search. Create your own keyword tags.", url: fast},{title:"Make it your own",text:"Add Styling and Color to your Notes", url:personalize}]
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
        <div className="WhyContainer">
             <SplashNav setShowSidebar={setShowSidebar}/>
             {(showSidebar)?<SplashSidebar setShowSidebar={setShowSidebar} />:null}
            <div className="WhyHeader">
                <span className="HeaderWhyQ">Why Choose WhatEverNote?</span>
                <p>WhatEvernote gives you whatever you need to keep your life organized—great note taking, project planning, and easy ways to find what you need, when you need it.</p>
                <div className="Login-btn"><button onClick={openSignup}>Let's Get Started</button></div>
            </div>
            <div className="WhyThumbnail__container">
                {whyList.map(why => (
                    <WhyThumbnail why={why}/>
                ))}

            </div>
            <div className="Why_Explaination">
                <span className="Why_EX1">A home for what's important</span>
                <span className="Why_EX2">Get quick access to the information </span>
                <div>
                  <img alt="home-screenshot" src={homeImage}></img>
                </div>
            </div>

            <div className="meet-devs">
                <h1>Meet the Developers</h1>
                <div className="dev-info">
                    <DevBio />
                </div>
            </div>

        </div>
        </>
    )
}
export default Whywhatevernote