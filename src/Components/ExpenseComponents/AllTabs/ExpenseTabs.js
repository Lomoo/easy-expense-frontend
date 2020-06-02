import React, { useReducer } from "react";
import styled from "styled-components";
import { ExpenseTable } from "./ExpenseTable";
import TabReducer from "./TabReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledTab = styled.div.attrs({
  className: "tabs is-small has-text-white is-size-6-desktop",
})`
  background: linear-gradient(60deg, #ab47bc, #8e24aa);
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(156, 39, 176, 0.4);
  padding: 15px;
  margin-top: -30px;
  border-radius: 3px;

  & ul {
    border-bottom-style: none;
  }

  & a {
    border-bottom-style: none;
  }

  & li.is-active {
    background-color: rgba(255, 255, 255, 0.2);
    transition: 0.3s background-color 0.2s;
    border-radius: 3px;
  }
`;

const initialTabState = {
  groceriesIsActive: true,
  eatingOutIsActive: false,
  miscVariableIsActive: false,
  fixedIsActive: false,
  randomIsActive: false,

  //tabs 1-5 associate with grocery, eating out, fixed, misc and random
};

export const ExpenseTabs = () => {
  //const [tabState, setTabState] = useState(initialTabState);
  const [state, dispatch] = useReducer(TabReducer, initialTabState);

  return (
    <div className="box is-relative	">
      <StyledTab>
        <ul>
          <span className="icon-tab">Expenses:</span>
          <li
            className={` ${state.groceriesIsActive ? "is-active" : ""}`}
            onClick={() =>
              dispatch({
                type: "GROCERIES",
              })
            }
          >
            <a className="has-text-white">
            <span className="icon-tab">
                <FontAwesomeIcon icon="shopping-bag" size="1x" color="white" />
              </span>
              Groceries</a>
          </li>
          <li
            className={` ${state.eatingOutIsActive ? "is-active" : ""}`}
            onClick={() =>
              dispatch({
                type: "EATING_OUT",
              })
            }
          >
            <a className="has-text-white">
              <span className="icon-tab">
                <FontAwesomeIcon icon="drumstick-bite" size="1x" color="white" />
              </span>
              Eating Out
            </a>
          </li>
          <li
            className={` ${state.miscVariableIsActive ? "is-active" : ""}`}
            onClick={() =>
              dispatch({
                type: "MISC",
              })
            }
          >
            <a className="has-text-white">
              <span className="icon-tab">
                <FontAwesomeIcon icon="question" size="1x" color="white" />
              </span>
              Misc/Variable
            </a>
          </li>
          <li
            className={` ${state.fixedIsActive ? "is-active" : ""}`}
            onClick={() =>
              dispatch({
                type: "FIXED",
              })
            }
          >
            <a className="has-text-white">
            <span className="icon-tab">
                <FontAwesomeIcon icon="calendar" size="1x" color="white" />
              </span>
              Fixed</a>
          </li>
          <li
            className={` ${state.randomIsActive ? "is-active" : ""}`}
            onClick={() =>
              dispatch({
                type: "RANDOM",
              })
            }
          >
            <a className="has-text-white">
              <span className="icon-tab">
                <FontAwesomeIcon icon="random" size="1x" color="white" />
              </span>
              Random
            </a>
          </li>
        </ul>
      </StyledTab>
      <div
        className={` ${state.groceriesIsActive ? "is-active" : "is-hidden"}`}
      >
        <ExpenseTable categoryId={1} />
      </div>
      <div
        className={` ${state.eatingOutIsActive ? "is-active" : "is-hidden"}`}
      >
        {" "}
        <ExpenseTable categoryId={2} />
      </div>
      <div
        className={` ${state.miscVariableIsActive ? "is-active" : "is-hidden"}`}
      >
        {" "}
        <ExpenseTable categoryId={3} />
      </div>
      <div className={`  ${state.fixedIsActive ? "is-active" : "is-hidden"}`}>
        <ExpenseTable categoryId={4} />{" "}
      </div>
      <div className={` ${state.randomIsActive ? "is-active" : "is-hidden"}`}>
        {" "}
        <ExpenseTable categoryId={5} />
      </div>
    </div>
  );
};
