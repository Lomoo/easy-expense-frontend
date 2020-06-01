import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Components/Home";
import "./App.css";
import "./App.scss";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp"


export const AppRouter = () => {
  return (
    <Router>
      <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/signup" exact={true} component={SignUp} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
