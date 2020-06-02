import React, { useContext } from "react";
import AppNav from "./AppNav";
import "../App.scss";
import { StickyAddExpense } from "./ExpenseComponents/StickyAddExpense";
import styled from "styled-components";
import { GlobalProvider } from "./Context/GlobalState";
import { UserContext } from "./Auth/UserState";
import { IncomeCard } from "./ExpenseComponents/SummaryCards/IncomeCard";
import { ExpenseCard } from "./ExpenseComponents/SummaryCards/ExpenseCard";
import { NetSavedCard } from "./ExpenseComponents/SummaryCards/NetSavedCard";
import { BudgetCard } from "./ExpenseComponents/SummaryCards/BudgetCard";
import  {IncomeExpenseTabs} from "./ExpenseComponents/AllTabs/IncomeExpenseTabs";
import { ExpenseChartWrapper } from "./ExpenseComponents/ExpenseCharts/ExpenseChartWrapper";
import { AddNewUser } from "./Auth/AddNewUser";
const LargerContainer = styled.div.attrs({
  className: "container is-fullhd",
})`
  max-width: 1360px;
`;
const Conditional = (props) => {
  return !!props.if && props.children;
};

export const Home = () => {
  const { user, userLoading, newUser } = useContext(UserContext);

  return (
    <GlobalProvider>
      <AppNav />
      <Conditional if={user && user.signInUserSession}>
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
      
      </Conditional>
      <Conditional if={!user && !userLoading}>
        <div>not logging, sign in to see the good stuff</div>
      </Conditional>
    </GlobalProvider>
  );
};

export default Home;
