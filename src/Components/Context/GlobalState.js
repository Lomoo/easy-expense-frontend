import React, { createContext, useReducer, useContext } from "react";
import AppReducer from "./AppReducer";
import { UserContext } from "../Auth/UserState";

const initialState = {
  expenses: [],
  incomes:[],
  error: null,
  loading: true,
};

// create context
export const GlobalContext = createContext(initialState);

//export
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const { user } = useContext(UserContext);

  

  async function getExpenses() {
    try {
      const getUrl =
        "/api/expenses/" + user.signInUserSession.idToken.payload.sub;
      const response = await fetch(getUrl);
      const body = await response.json();

      dispatch({
        type: "GET_EXPENSES",
        payload: body,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "EXPENSE_ERROR",
        payload: e.error,
      });
    }
  }

  async function updateExpense(expense) {
    try {
      
      const res = await fetch("/api/expenses/update", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: expense.id,
          expenseAmount: expense.expenseAmount,
          description: expense.description,
          category: {
            id: expense.category.id,
          },
          user_entity: {
            id: user.signInUserSession.idToken.payload.sub,
          },
        }),
      });

      const body = await res.json();
      dispatch({
        type: "UPDATE_EXPENSE",
        payload: body,
      });
    } catch (e) {
      dispatch({
        type: "EXPENSE_ERROR",
        payload: e.error,
      });
    }
  }
  async function addExpense(expense) {
    try {
      const res = await fetch(`/api/expenses/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: expense.id,
          expenseAmount: expense.expenseAmount,
          description: expense.description,
          category: {
            id: expense.expenseCategory,
          },
          user_entity: {
            id: user.signInUserSession.idToken.payload.sub,
          },
        }),
      });
      const body = await res.json();
      dispatch({
        type: "ADD_EXPENSE",
        payload: body,
      });
    } catch (e) {
      dispatch({
        type: "EXPENSE_ERROR",
        payload: e.error,
      });
    }
  }
  async function deleteExpense(id) {
    try {
      await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: "DELETE_EXPENSE",
        payload: id,
      });
    } catch (e) {
      dispatch({
        type: "EXPENSE_ERROR",
        payload: e.error,
      });
    }
  }
  async function getIncomes() {
    try {
      const getUrl =
        "/api/incomes/" + user.signInUserSession.idToken.payload.sub;
      const response = await fetch(getUrl);
      const body = await response.json();

      dispatch({
        type: "GET_INCOMES",
        payload: body,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "EXPENSE_ERROR",
        payload: e.error,
      });
    }
  }
  async function updateIncome(income) {
    try {
      const putURL = "/api/incomes/update/" + income.id + "/" +  user.signInUserSession.idToken.payload.sub;
      const res = await fetch(putURL, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: income.id,
          income: income.income,
          description: income.description,
          user_entity: {
            id: user.signInUserSession.idToken.payload.sub,
          },
        }),
      });

      const body = await res.json();
      dispatch({
        type: "UPDATE_INCOME",
        payload: body,
      });
    } catch (e) {
      dispatch({
        type: "EXPENSE_ERROR",
        payload: e.error,
      });
    }
  }

  async function addIncome(income) {
    try {
      const res = await fetch(`/api/incomes/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: income.id,
          income: income.income,
          description: income.description,
          user_entity: {
            id: user.signInUserSession.idToken.payload.sub,
          },
        }),
      });
      const body = await res.json();
      dispatch({
        type: "ADD_INCOME",
        payload: body,
      });
    } catch (e) {
      dispatch({
        type: "EXPENSE_ERROR",
        payload: e.error,
      });
    }
  }
  async function deleteIncome(id) {
    try {
      await fetch(`/api/incomes/${id}/${user.signInUserSession.idToken.payload.sub}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: "DELETE_INCOME",
        payload: id,
      });
    } catch (e) {
      dispatch({
        type: "EXPENSE_ERROR",
        payload: e.error,
      });
    }
  }


  return (
    <GlobalContext.Provider
      value={{
        expenses: state.expenses,
        incomes: state.incomes,
        error: state.error,
        loading: state.loading,
        getExpenses,
        deleteExpense,
        addExpense,
        updateExpense,
        getIncomes,
        updateIncome,
        deleteIncome,
        addIncome,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
