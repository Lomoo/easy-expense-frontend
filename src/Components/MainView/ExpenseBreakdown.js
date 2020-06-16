import React, { useContext } from "react";
import useExpenses from "../Hooks/useExpenses";
import { UserContext } from "../Auth/UserState";
import { LeftMenu } from "../MainView/LeftMenu";
import { AppNav } from "../AppNav";
import { LoadingUI } from "../UI/LoadingUI";
import styled from "styled-components";
import { Loading } from "aws-amplify-react";

const LargerContainer = styled.div.attrs({
  className: "container is-fullhd",
})`
  max-width: 1360px;
  padding-left: 15rem;
`;


export const ExpenseBreakdown = () => {
  const { user, userSub } = useContext(UserContext);

  return (
    <>
      <AppNav />
      <LeftMenu />
      <LargerContainer>
        <div>{user ? <Expenses  userSub={userSub}/> : " loading..."}</div>
      </LargerContainer>
    </>
  );
};

function Expenses({userSub}) {

  const { status, data, error, isFetching } = useExpenses(userSub);

  return (
    <div>
      <h1>Expenses</h1>
      <div>
        {status === "loading" ? (
          <p>loading...</p>
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((expense) => (
                <p key={expense.id}>
                  <p>{expense.expenseAmount}</p>
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
