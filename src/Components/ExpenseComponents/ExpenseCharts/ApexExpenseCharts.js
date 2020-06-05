import React, { useContext, useEffect, useState, useReducer } from "react";
import Chart from "react-apexcharts";
import { GlobalContext } from "../../Context/GlobalState";
const initialChartState = {
  series: [
    {
      name:"series-1",
      data:[]
    }
  ],
  options: {
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};
const amt = [];
const expenseCategories = 5;

export const ApexDoughtNutChart = () => {
  const { expenses, incomes } = useContext(GlobalContext);
  const [chartState, dispatch] = useReducer(ChartReducer, initialChartState);

  useEffect(() => {
    for (var i = 0; i < expenseCategories; i++) {
      amt[i] = parseInt(getExpenseForCategory(expenses, i + 1));
    }

    dispatch({
      type: "UPDATE_CHART_SERIES",
      payload: amt,
    });

    console.log(amt);
  }, [expenses]);


  return (
    <Chart
      options={chartState.options}
      series={chartState.series}
      type="donut"
    />
  );
};

function ChartReducer(state, action) {
  switch (action.type) {
    case "UPDATE_CHART_SERIES":
      return {
        ...state,
        series: action.payload,
      };
    default:
      return state;
  }
}

function getExpenseForCategory(expenses, CategoryID) {
  const amount = expenses
    .filter((expense) => expense.category.id === CategoryID)
    .map((expense) => expense.expenseAmount);
  return amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
}
