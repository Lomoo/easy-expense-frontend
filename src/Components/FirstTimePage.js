import React from "react";
import { NavLink } from "react-router-dom";

export const FirstTimePage = () => {
  return (
    <>
      <section className="hero is-large is-light is-bold text-is-aligned-center">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Easy Expense, an easy-to-use expense tracker
            </h1>
            <h2 className="subtitle">
              Track your income and expenses, and figure out your daily budget.
            </h2>
            <NavLink to="/signup" className="button is-primary">
              Sign up to get started
            </NavLink>
          </div>
        </div>
      </section>

      <section className="hero is-medium is-light is-bold text-is-aligned-center">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Why Easy Expense?</h1>
            <h2 className="subtitle">
              Plenty of expense trackers come with a multitude of different
              functionality. From connecting to your bank account, to
              automatically tracking your investments.
            </h2>
            <div className="tile is-ancestor">
              <div className="tile is-4 is-vertical is-parent">
                <div className="tile is-child box">
                  <p className="title text-is-aligned-left">1.</p>
                  <p className="subtitle text-is-aligned-left">
                    Easy to use right out of the box, without privacy concerns.{" "}
                  </p>
                </div>
                <div className="tile is-child box">
                  <p className="title text-is-aligned-left">2.</p>
                  <p className="subtitle text-is-aligned-left">
                    Synced across your devices.{" "}
                  </p>
                </div>
              </div>
              <div className="tile is-parent">
                <div className="tile is-child box">
                  <p className="title text-is-aligned-left">3.</p>
                  <p className="subtitle text-is-aligned-left">
                    One Expense table and One income table. Choose from 5 and
                    only 5 catagories to categorize your expenses. Why only
                    five? Because if you can't decide on a category, then it
                    probably wasn't important enough. Get a breakdown of your
                    worst offending expenses, and see how your income-expense
                    ratio is. Know exactly your daily budget so you don't go
                    over it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
