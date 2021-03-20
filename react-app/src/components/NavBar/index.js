import React from 'react';
import { NavLink } from 'react-router-dom';
import "./index.css"
import LogoutButton from '../auth/LogoutButton';

const NavBar = ({ setAuthenticated }) => {
  let user = {"id":1,"firstname":"Fake", "lastname": "McDonald", "username":"FakeMcFake", "email":"fake@fake.com"}
  return (
    <nav>
      <div class="nav_top__circles">
        <div class="nav_circles letter-circle">
          {user.firstname[0]}
        </div>
        <div class="nav_circles search-circle">
          <i class="fas fa-search"></i>
        </div>
        <div class="nav_circles plus-circle">
          <i class="fas fa-plus"></i>
        </div>

      </div>
      <div>
        <div className="middle_nav__container">
          <div className="icon__holder home_icon">
            <NavLink to="/" exact={true} activeClassName="active">
              <i class="fas fa-home"></i>
            </NavLink>
          </div>
          <div className="icon__holder star_icon">
            <i class="fas fa-star"></i>

          </div>
          <div className="icon__holder note_icon">
            <i class="fas fa-file-alt"></i>
          </div>
        </div>
        <div className="middle2_nav__container">
        <div className="icon__holder notebook_icon">
          <i class="fas fa-book"></i>
        </div>
        <div className="icon__holder tag_icon">
          <i class="fas fa-tag"></i>
        </div>
        <div className="icon__holder user_icon">
          <i class="fas fa-user-friends"></i>
        </div>
        </div>
        <div className="middle3_nav__container">
        <div className="icon__holder trash_icon">
          <i class="fas fa-trash"></i> 
        </div>
        </div>
      </div>
      {/* <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li> */}
      {/* </ul> */}
    </nav>
  );
}

export default NavBar;