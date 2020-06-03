import React, { useState, useContext } from "react";
import { NavLink } from 'react-router-dom'
import { UserContext } from "./Auth/UserState";
import { Auth } from "aws-amplify";
import "../App.scss";

const Conditional = (props) => {
  return !!props.if && props.children;
};
export const AppNav = () => {
  const [isActive, setisActive] = useState(false);
  const {user,userLoading } = useContext(UserContext);

  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="/easyexpense-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <NavLink to="/" className="navbar-item">
            Home
          </NavLink>

          {/* <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>
            <div className="navbar-dropdown is-boxed">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div> */}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Conditional if={!user && !userLoading}>
                <NavLink to="/signup" className="button is-primary">
                  <strong>Sign up</strong>
                </NavLink>
                <NavLink to="/login" className="button is-light">
                  Log in
                </NavLink>
              </Conditional>
              <Conditional
                if={user && user.signInUserSession}
              >
                <button
                  className="button is-primary"
                  onClick={() => {
                    Auth.signOut()
                      .then((data) => {
                        console.log("signed out: ", data);
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  Sign Out
                </button>
              </Conditional>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNav;
