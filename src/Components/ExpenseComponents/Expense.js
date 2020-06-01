import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

export const Expense = ({expense}) => {
  //just take the deleteExpense function from our global context
  const { deleteExpense } = useContext(GlobalContext);

  return (
    <tr>
      <td >{expense.description}</td>
      <td className="has-text-success">${expense.expenseAmount}</td>
      <td> <button onClick={() => deleteExpense(expense.id)} className="button is-danger is-small"> x</button></td>
    </tr>
  );
};
