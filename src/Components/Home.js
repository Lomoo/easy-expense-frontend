import React, { useContext, useEffect, useState } from "react";
import AppNav from "./AppNav";
import styled from "styled-components";
import { GlobalProvider } from "./Context/GlobalState";
import { UserContext } from "./Auth/UserState";
import { GlobalContext } from "./Context/GlobalState";
import { Dashboard } from "./MainView/Dashboard";

const LargerContainer = styled.div.attrs({
  className: "container is-fullhd",
})`
  max-width: 1360px;
`;
const Conditional = (props) => {
  return !!props.if && props.children;
};
const baseApiUrl = "";

export const Home = () => {
  const { user, userLoading, userSub } = useContext(UserContext);
  const { expenses, incomes } = useContext(GlobalContext);

  async function addUser(userSub) {
    try {
      const body = await fetch(
        `https://easy-expense-server.herokuapp.com/api/users`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userSub,
          }),
        }
      );
    } catch (e) {
      console.log("unable to create user");
    }
  }

  useEffect(() => {
    if (userSub != null && (expenses.length < 1 || incomes.length < 1)) {
      addUser(userSub);
    }
  }, [userSub, incomes, expenses]);

  return (
    <>
      <GlobalProvider>
      <AppNav />
      <Conditional if={user && user.signInUserSession}>
        <Dashboard />
      </Conditional>
      <Conditional if={!user && !userLoading}>
        <div>not logging, sign in to see the good stuff</div>
      </Conditional>
      </GlobalProvider>
    </>
  );
};

export default Home;
