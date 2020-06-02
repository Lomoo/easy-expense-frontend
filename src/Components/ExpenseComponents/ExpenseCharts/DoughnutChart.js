import { Doughnut, Pie, defaults } from "react-chartjs-2";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../Context/GlobalState";
import datalabels from "chartjs-plugin-datalabels";

const initialChartState = {
  labels: ["Groceries", "Eating Out", "Misc/Variable", "Fixed", "Random"],
  datasets: [
    {
      data: [0, 0, 0, 0, 0],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4C6085", "#00CC6D"],
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4C6085",
        "#00CC6D",
      ],
    },
  ],
};
const legendOpts = {
  display: true,
  position: "left",
  fullWidth: true,
};
const otherOpts = {
  plugins: {
    datalabels: {
      display: true,
      color: "white",
      fontWeight : "strong"
    },
  },
};

export const DoughnutChart = () => {
  const { expenses, incomes } = useContext(GlobalContext);
  const [chartState, setChartState] = useState(initialChartState);

  const amt = [];
  const expenseCategories = 5;

  useEffect(() => {
    for (var i = 0; i < expenseCategories; i++) {
      amt[i] = getExpenseForCategory(expenses, i + 1);
    }
    setChartState({
      labels: ["Groceries", "Eating Out", "Misc/Variable", "Fixed", "Random"],
      datasets: [
        {
          data: amt,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4C6085",
            "#00CC6D",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4C6085",
            "#00CC6D",
          ],
        },
      ],
    });
  }, [expenses]);

  return (
    <div className="columns">
      <div className="column is-two-thirds">
        <div className="box">
          <div className="title has-text-centered"> Your Expenses</div>
          <Doughnut data={chartState} legend={legendOpts} options={otherOpts} />
        </div>
      </div>
      <div className="column is-one-third  ">
        <div className="box"></div>
      </div>
    </div>
  );
};

function getExpenseForCategory(expenses, CategoryID) {
  const amount = expenses
    .filter((expense) => expense.category.id === CategoryID)
    .map((expense) => expense.expenseAmount);
  return amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
}
