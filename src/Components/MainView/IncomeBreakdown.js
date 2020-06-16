import React, { useContext } from "react";
import useExpenses from "../Hooks/useExpenses";
import { UserContext } from "../Auth/UserState";
import { LeftMenu } from "../MainView/LeftMenu";
import { AppNav } from "../AppNav";
import styled from "styled-components";

const LargerContainer = styled.div.attrs({
  className: "container is-fullhd",
})`
  max-width: 1360px;
  padding-left: 15rem;
`;


export const IncomeBreakdown = () => {
  const { user, userSub } = useContext(UserContext);
  return (
    <>
      <AppNav />
      <LeftMenu />
      <LargerContainer>
        <div>{user ? `${userSub}` : " loading..."}</div>
        <div>{user ? <Expenses  userSub={userSub}/> : " loading..."}</div>
      </LargerContainer>
    </>
  );
};

function Incomes({userSub}) {

  const { status, data, error, isFetching } = useIncomes(userSub);

  return (
    <div>
      <h1>Incomes</h1>
      <div>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((expense) => (
                <p key={income.id}>
                  <p>{income.income}</p>
                </p>
              ))}
            </div>
            <div>{isFetching ? " Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}
