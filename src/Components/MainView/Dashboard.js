import React from "react";
import { LeftMenu } from "./LeftMenu";
import { ExpenseTabs } from "../ExpenseComponents/AllTabs/ExpenseTabs";
import styled from "styled-components";

const LargerContainer = styled.div.attrs({
  className: "container is-fullhd",
})`
  max-width: 1920px;
`;
export const Dashboard = () => {
  return (
    <>
        <LeftMenu />
      {/* <section className="section">
          <ExpenseTabs />
      </section> */}
    </>
  );
};
