import React, { useState, useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

export const AddExpense = (props) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryState, setCategoryState] = useState(1);

  const { addExpense } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Math.floor(Math.random() * 100000),
      description: text,
      expenseAmount: +amount,
      expenseCategory: categoryState
    };
    addExpense(newExpense);
  };

  return (
    <>
      <label className="label">Expense</label>
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="field is-size-7-mobile">
          <p className="control is-expanded">
            <input
              className="input "
              type="text"
              name="description"
              placeholder="Description"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </p>
          <p className="control">
            <input
              className="input is-danger"
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="$ Amount"
            />
          </p>
          <div className="control">
            <div className="select">
              <select
                onChange={(e) => setCategoryState(e.target.value)}
                value={categoryState}
              >
                <option value="1">Groceries</option>
                <option value="2">Eating Out</option>
                <option value="3">Misc/Variable</option>
                <option value="4">Fixed Expenses</option>
                <option value="5">Random</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="button is-danger is-fullwidth">
          Add Expense
        </button>
      </form>
    </>
  );
};
