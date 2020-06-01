import React from "react";
import {IncomeTab} from "./IncomeTab";
import {ExpenseTabs} from "./ExpenseTabs";
export const IncomeExpenseTabs = () => {
  return (
    <div className="columns">
      <div className="column is-two-thirds ">
          <ExpenseTabs />
      </div>
      <div className="column is-one-third  ">
        <IncomeTab />
      </div>
    </div>
  );
};
