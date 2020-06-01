import React, { useState, useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

export const AddIncome = (props) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");


  const { addIncome } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newIncome = {
      id: Math.floor(Math.random() * 100000),
      description: text,
      income: +amount,
    };
    addIncome(newIncome);
  };

  return (
    <>
      <label className="label">Income</label>
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
              className="input is-success"
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="$ Amount"
            />
          </p>
        </div>
        <button type="submit" className="button is-success is-fullwidth">
          Add Income
        </button>
      </form>
    </>
  );
};
