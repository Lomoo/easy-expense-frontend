import React from "react";
import styled from "styled-components";
import { IncomeTable } from "./IncomeTable";
const StyledTab = styled.div.attrs({
  className: "tabs is-small has-text-white is-size-5-desktop",
})`
  background: linear-gradient(60deg, #ffa726, #fb8c00);
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(255, 152, 0, 4);
  padding: 15px;
  margin-top: -30px;
  border-radius: 3px;
  color: white;
`;

export const IncomeTab = () => {
  return (
    <div className="box is-relative	">
      <StyledTab className="tabs is-small ">
        <ul>
          <li className="is-active">
            <a>Income</a>
          </li>
        </ul>
      </StyledTab>
      <div className="is-active">
        <IncomeTable />
      </div>
    </div>
  );
};
