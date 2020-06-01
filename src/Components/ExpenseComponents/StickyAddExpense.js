import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AddExpense } from "./AddExpense";
import { AddIncome } from "./AddIncome";

const StickyRightDropdown = styled.div.attrs({
  className: "dropdown is-up",
})`
  position: fixed;
  top: 75%;
  right: 0;
  z-index: 1000;

  .dropdown-trigger .button {
    background: rgba(0,0,0,.3) !important;
  }
`;

export const StickyAddExpense = () => {
  const [isActive, setisActive] = useState(false);
  return (
    <StickyRightDropdown
      className={` is-right ${isActive ? "is-active" : ""} `}
    >
      <div className="dropdown-trigger">
        <button
          onClick={() => {
            setisActive(!isActive);
          }}
          className="button is-medium"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            <FontAwesomeIcon icon="folder-plus" size="lg" color="white"/>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
          <AddExpense />
          <AddIncome />
          </div>
        </div>
      </div>
    </StickyRightDropdown>
  );
};

export default StickyAddExpense;
