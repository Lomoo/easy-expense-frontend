import { Doughnut, Pie, defaults } from "react-chartjs-2";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../Context/GlobalState";
import datalabels from "chartjs-plugin-datalabels";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

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
  position: "top",
  fullWidth: true,
};
const legendOptsMobile = {
  display: true,
  position: "top",
  fullWidth: true,
};

const otherOpts = {
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      display: false,
      color: "white",
      fontWeight: "strong",
    },
  },
};

export const ExpenseDoughnutChart = () => {
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
    <>
      {/* <BrowserView> */}
      <article className="canvas-container">
        <Doughnut data={chartState} legend={legendOpts} options={otherOpts} />
      </article>

      {/* </BrowserView>
      <MobileView>
        <Doughnut data={chartState} legend={legendOptsMobile} options={otherOpts} />
      </MobileView>
      {isMobile && 
        <div> mobile</div>
      } */}
    </>
  );
};

function getExpenseForCategory(expenses, CategoryID) {
  const amount = expenses
    .filter((expense) => expense.category.id === CategoryID)
    .map((expense) => expense.expenseAmount);
  return amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
}
