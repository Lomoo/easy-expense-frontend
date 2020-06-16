import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./Auth/UserState";
import { Auth } from "aws-amplify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";
import "../App.scss";

const Conditional = (props) => {
  return !!props.if && props.children;
};

const AppNavigation = styled.nav.attrs({
  className: "navbar",
  role: "navigation",
  "aria-label": "main navigation",
})`
  padding-left: 15rem;
`;

const LogoutNavbarButton = styled.button.attrs({
  className: "navbar-item has-divider button is-light",
})`
  border-color: unset;
  border-width: unset;
  height: unset !Important;
  border: transparent;
  color: #7a7a7a !important;
  background-color: white !important;

  :visited {
    border-color: transparent;
  }
  :active {
    border-color: unset;
    color: #3273dc !important;
  }

  :hover {
    background-color: #fafafa !important;
    color: #3273dc !important;
    border-color: unset;
  }
`;

export const AppNav = () => {
  const [isActive, setisActive] = useState(false);
  const { user, userLoading } = useContext(UserContext);

  return (
    <AppNavigation>
      <div className="navbar-brand">
        {/* <a className="navbar-item" href="https://bulma.io">
          <img
            src="/easyexpense-logo.png"
            width="112"
            height="28"
          />
        </a> */}

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
        </div>

        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>
            <div className="navbar-dropdown is-boxed">
              <NavLink to="/" className="navbar-item">
                Dashboard
              </NavLink>
              <NavLink to="/expense-breakdown" className="navbar-item">
                Your Expenses
              </NavLink>
              <a className="navbar-item">Income Breakdown</a>
              <a className="navbar-item">Your Expenses</a>
              <a className="navbar-item">Home</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Sign Out</a>
            </div>
          </div>

          <Conditional if={!user && !userLoading}>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>
              <div className="navbar-dropdown is-boxed">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Home</a>
                <hr className="navbar-divider" />
                <a to="/signup" className="navbar-item">
                  Sign Up
                </a>
                <a to="/login" className="navbar-item">
                  Login{" "}
                </a>
              </div>
            </div>
          </Conditional>
          <div className="navbar-item has-divider">
            <div className="buttons">
              <Conditional if={!user && !userLoading}>
                <NavLink to="/signup" className="button is-primary">
                  <strong>Sign up</strong>
                </NavLink>
                <NavLink to="/login" className="button is-light">
                  Log in
                </NavLink>
              </Conditional>
              <Conditional if={user && user.signInUserSession}>
                <button className="button is-primary" onClick={() => SignOut()}>
                  Sign Out
                </button>
              </Conditional>
            </div>
          </div>
          <LogoutNavbarButton onClick={() => SignOut()}>
            <span className="icon-tab">
              <FontAwesomeIcon icon="sign-out-alt" size="1x" />
            </span>
          </LogoutNavbarButton>
        </div>
      </div>
    </AppNavigation>
  );
};

export default AppNav;

function SignOut() {
  Auth.signOut()
    .then((data) => {
      console.log("signed out: ", data);
    })
    .catch((err) => console.log(err));
}
