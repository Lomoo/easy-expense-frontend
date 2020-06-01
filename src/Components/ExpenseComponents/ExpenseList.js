import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "../Context/GlobalState";
import { Expense } from "./Expense";


export const ExpenseList = (props) => {
  const { expenses, getExpenses, loading } = useContext(GlobalContext);

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <>
      {!loading && (
        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Description</th>
              <th> Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.filter(expense => expense.category.id === props.expenseCategory).map((expense) => ( 
          <Expense key={expense.id} expense={expense} />
          ))}

          </tbody>
        </table>
      )}
      {loading && <div> loading</div>}
    </>
  );
};
