export default (state, action) => {
  switch (action.type) {
    case "GET_EXPENSES":
      return {
        ...state,
        loading: false,
        expenses: action.payload,
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id
            ? Object.assign({}, expense, action.payload)
            : expense
        ),
      };
    case "GET_INCOMES":
      return {
        ...state,
        loading: false,
        incomes: action.payload,
      };
      case "ADD_INCOME":
        return {
          ...state,
          incomes: [...state.incomes, action.payload],
        };
    case "UPDATE_INCOME":
      return {
        ...state,
        incomes: state.incomes.map((income) =>
          income.id === action.payload.id
            ? Object.assign({}, income, action.payload)
            : income
        ),
      };
      case "DELETE_INCOME":
        return {
          ...state,
          incomes: state.incomes.filter(
            (incomes) => incomes.id !== action.payload
          ),
        };
    case "EXPENSE_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
