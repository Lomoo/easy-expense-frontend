import React, { useReducer } from "react";
import styled from "styled-components";
import { ExpenseTable } from "./ExpenseTable";
import TabReducer from "./TabReducer";
const StyledTab = styled.div.attrs({
  className: "tabs is-small has-text-white is-size-5-desktop",
})`
  background: linear-gradient(60deg, #ab47bc, #8e24aa);
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(156, 39, 176, 0.4);
  padding: 15px;
  margin-top: -30px;
  border-radius: 3px;
  color: white;
`;
// const expenseCategories = [
//   {
//     id: 1,
//     name: "Groceries",
//   },
//   {
//     id: 2,
//     name: "Eating Out",
//   },
//   {
//     id: 3,
//     name: "Misc/Variable Expenses",
//   },
//   {
//     id: 4,
//     name: "Fixed Expenses",
//   },
//   {
//     id: 5,
//     name: "Random",
//   },
// ];
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
              <span>Expenses:</span>
              <li
                className={` ${state.groceriesIsActive ? "is-active" : ""}`}
                onClick={() =>
                  dispatch({
                    type: "GROCERIES",
                    payload: 1,
                  })
                }
              >
                <a>Grocercies</a>
              </li>
              <li
                className={` ${state.eatingOutIsActive ? "is-active" : ""}`}
                onClick={() =>
                  dispatch({
                    type: "EATING_OUT",
                    payload: 1,
                  })
                }
              >
                <a>Eating Out</a>
              </li>
              <li
                className={` ${state.miscVariableIsActive ? "is-active" : ""}`}
                onClick={() =>
                  dispatch({
                    type: "MISC",
                    payload: 1,
                  })
                }
              >
                <a>Misc/Variable</a>
              </li>
              <li
                className={` ${state.fixedIsActive ? "is-active" : ""}`}
                onClick={() =>
                  dispatch({
                    type: "FIXED",
                    payload: 1,
                  })
                }
              >
                <a>Fixed</a>
              </li>
              <li
                className={` ${state.randomIsActive ? "is-active" : ""}`}
                onClick={() =>
                  dispatch({
                    type: "RANDOM",
                    payload: 1,
                  })
                }
              >
                <a>Random</a>
              </li>
            </ul>
          </StyledTab>
          <div
            className={` ${
              state.groceriesIsActive ? "is-active" : "is-hidden"
            }`}
          >
            <ExpenseTable categoryId={1} />
          </div>
          <div
            className={` ${
              state.eatingOutIsActive ? "is-active" : "is-hidden"
            }`}
          >
            {" "}
            <ExpenseTable categoryId={2} />
          </div>
          <div
            className={` ${
              state.miscVariableIsActive ? "is-active" : "is-hidden"
            }`}
          >
            {" "}
            <ExpenseTable categoryId={3} />
          </div>
          <div
            className={` ${state.fixedIsActive ? "is-active" : "is-hidden"}`}
          >
            <ExpenseTable categoryId={4} />{" "}
          </div>
          <div
            className={` ${state.randomIsActive ? "is-active" : "is-hidden"}`}
          >
            {" "}
            <ExpenseTable categoryId={5} />
          </div>
        </div>
  );
};
