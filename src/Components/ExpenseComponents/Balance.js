import React, {useContext} from "react";
import { GlobalContext } from "../Context/GlobalState";
export const Balance = () => {
  const { expenses } = useContext(GlobalContext);

  const amounts = expenses.map(expense => expense.amount);
  const total = amounts.reduce((acc,item) => (acc +=item),0).toFixed(2);
  return (
    <>
      <h2 >Your Balance</h2>
      <h1> ${total}</h1>
    </>
  );
};
