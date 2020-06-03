import React, { createContext, useReducer, useContext } from "react";
import AppReducer from "./AppReducer";
import { UserContext } from "../Auth/UserState";

const initialState = {
  expenses: [],
  incomes:[],
  error: null,
  loading: true,
};

const baseHttpUrl = "https://easy-expense-server.herokuapp.com"
// create context
export const GlobalContext = createContext(initialState);

//export
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const { user } = useContext(UserContext);

  

  async function getExpenses() {
    try {
      const apiUrl =
      baseHttpUrl + "/api/expenses/" + user.signInUserSession.idToken.payload.sub;
      const response = await fetch(apiUrl);
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
      const apiUrl = baseHttpUrl + "/api/expenses/update";
      const res = await fetch(apiUrl, {
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
      const apiUrl = baseHttpUrl + "/api/expenses/";
      const res = await fetch(apiUrl, {
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
      const apiUrl = baseHttpUrl + `/api/expenses/${id}`;
      await fetch(apiUrl, {
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
      const apiUrl = baseHttpUrl + "/api/incomes/" + user.signInUserSession.idToken.payload.sub;
      const response = await fetch(apiUrl);
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
      const apiUrl = baseHttpUrl + "/api/incomes/update/" + income.id + "/" +  user.signInUserSession.idToken.payload.sub;
      const res = await fetch(apiUrl, {
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
      const apiUrl = baseHttpUrl + "/api/incomes/";
      const res = await fetch(apiUrl, {
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
    const apiUrl = baseHttpUrl + `/api/incomes/${id}/${user.signInUserSession.idToken.payload.sub}`;
    try {
      await fetch(apiUrl, {
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
  async function addUser(userSub) {
    const apiUrl = baseHttpUrl + "/api/users/";
    try {
      await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userSub,
        }),
      });
    } catch (e) {
      console.log("unable to create user");
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
        addUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
