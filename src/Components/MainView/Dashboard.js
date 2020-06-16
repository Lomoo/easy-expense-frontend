import React, {useContext} from "react";
import { LeftMenu } from "./LeftMenu";
import { IncomeCard } from "../ExpenseComponents/SummaryCards/IncomeCard";
import { ExpenseCard } from "../ExpenseComponents/SummaryCards/ExpenseCard";
import { NetSavedCard } from "../ExpenseComponents/SummaryCards/NetSavedCard";
import { BudgetCard } from "../ExpenseComponents/SummaryCards/BudgetCard";
import { IncomeExpenseTabs } from "../ExpenseComponents/AllTabs/IncomeExpenseTabs";
import { ExpenseChartWrapper } from "../ExpenseComponents/ExpenseCharts/ExpenseChartWrapper";
import { GlobalContext } from "../Context/GlobalState";
import {UserContext} from "../Auth/UserState";
import styled from "styled-components";


const LargerContainer = styled.div.attrs({
  className: "container is-fullhd",
})`
  max-width: 1360px;
`;

export const Dashboard = () => {

  return (
    <>
      <LeftMenu />
      <section className="section">
        <LargerContainer>
          <div className="columns">
            <div className="column">
              <IncomeCard />
            </div>
            <div className="column">
              <ExpenseCard />
            </div>
            <div className="column">
              <NetSavedCard />
            </div>
            <div className="column">
              <BudgetCard />
            </div>
          </div>
        </LargerContainer>
      </section>
      <section className="section">
        <LargerContainer>
          <IncomeExpenseTabs />
        </LargerContainer>
      </section>
      <section className="section">
        <LargerContainer>
          <ExpenseChartWrapper />
        </LargerContainer>
      </section>
    </>
    
  );
};
