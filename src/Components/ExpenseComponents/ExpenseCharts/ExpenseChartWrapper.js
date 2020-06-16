import React from "react";
import styled from "styled-components";
import { ExpenseDoughnutChart } from "./ExpenseDoughnutChart";

const StyledTab = styled.div.attrs({
  className: "tabs is-small has-text-white is-size-5-desktop",
})`
background: linear-gradient(60deg, #26c6da, #00acc1);
box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
  0 7px 10px -5px rgba(0, 172, 193, 0.4);
  padding: 15px;
  margin-top: -30px;
  border-radius: 3px;
  & ul {
    border-bottom-style: none;
  }

  & a {
    border-bottom-style: none;
  }
`;
export const ExpenseChartWrapper = () => {
  return (
    <div className="columns">
      <div className="column ">
        <div className="box is-relative	">
          <StyledTab>
            <ul>
              <li className="is-active">
                <a className="has-text-white">Breakdown of Your Expenses</a>
              </li>
            </ul>
          </StyledTab>
          <div className="is-active">
            <ExpenseDoughnutChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChartWrapper;
