import React from "react";
import styled from "styled-components";
import { IncomeTable } from "./IncomeTable";
const StyledTab = styled.div.attrs({
  className: "tabs is-small has-text-white is-size-6-desktop",
})`
  background: linear-gradient(60deg, #ffa726, #fb8c00);
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(255, 152, 0, 4);
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

export const IncomeTab = () => {
  return (
    <div className="box is-relative	">
      <StyledTab >
        <ul>
          <li className="is-active">
            <a className="has-text-white">Income</a>
          </li>
        </ul>
      </StyledTab>
      <div className="is-active">
        <IncomeTable />
      </div>
    </div>
  );
};
