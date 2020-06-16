import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation } from "react-router-dom";
const AsideMenu = styled.aside`
  display: flex;
  flex-direction: column;
  width: 15rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  height: 100vh;
  padding: 0;
  box-shadow: none;
  background-color: #2e323a;
`;

const MenulistItem = styled.span`
  padding-left: 1rem;
`;

const Menulabel = styled.p.attrs({
  className: "menu-label",
})`
  color: #666f81;
  font-size: 0.75em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0 0.75rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
`;

const Menulist = styled.ul.attrs({
  className: "menu-list",
})`
  & a {
    color: #727c8f;
    display: block;
  }
  & a:hover {
    background-color: #011627 !important;
    color: white;
  }
`;

const Asidetools = styled.div`
  display: flex;
  flex-grow: 0;
  flex-direction: row;
  width: 100%;
  background-color: #17191e;
  color: #fff;
  line-height: 3.25rem;
  height: 3.5rem;
  padding-left: 0.75rem;
`;

export const LeftMenu = () => {
  let location = useLocation();

  const [isActive, setisActive] = useState(false);

  return (
    <AsideMenu className="menu ">
      <Asidetools>
        <span>
          <b> Easy Expense </b>
        </span>
      </Asidetools>
      <Menulabel>General</Menulabel>
      <Menulist>
        <li>
          <NavLink
            to="/"
            className={`${location.pathname === "/" ? "is-active" : ""}`}
          >
            <span className="icon-tab">
              <FontAwesomeIcon icon="desktop" size="1x" />
            </span>
            <MenulistItem>Dashboard</MenulistItem>
          </NavLink>
        </li>
      </Menulist>
      <Menulabel>Transactions</Menulabel>
      <Menulist>
        <li>
          <NavLink
            to="/expense-breakdown"
            className={`${
              location.pathname === "/expense-breakdown" ? "is-active" : ""
            }`}
            onClick={() => {
              setisActive(!isActive);
            }}
          >
            <span className="icon-tab">
              <FontAwesomeIcon icon="money-check-alt" size="1x" />
            </span>
            <MenulistItem>Income Breakdown</MenulistItem>
          </NavLink>
        </li>
        <li>
          <a>
            <span className="icon-tab">
              <FontAwesomeIcon icon="coins" size="1x" />
            </span>
            <MenulistItem>Your Expenses</MenulistItem>
          </a>
        </li>
        <li>
          <a>
            <span className="icon-tab">
              <FontAwesomeIcon icon="wallet" size="1x" />
            </span>
            <MenulistItem>Saving</MenulistItem>
          </a>
        </li>
      </Menulist>
    </AsideMenu>
  );
};
