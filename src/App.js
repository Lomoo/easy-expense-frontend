import React from "react";
import AppRouter from "./AppRouter";
import "./App.css";
import "./App.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faFolderPlus,
  faMoneyCheckAlt,
  faExclamationCircle,
  faWallet,
  faCoins,
  faShoppingBag,
  faDrumstickBite,
  faRandom,
  faCalendar,
  faQuestion,
  faDesktop,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { UserProvider } from "./Components/Auth/UserState";
import { GlobalProvider } from "./Components/Context/GlobalState";
library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faFolderPlus,
  faMoneyCheckAlt,
  faExclamationCircle,
  faWallet,
  faCoins,
  faShoppingBag,
  faDrumstickBite,
  faRandom,
  faCalendar,
  faQuestion,
  faDesktop,
  faUser,
  faSignOutAlt
);

function App() {
  return (
    <UserProvider>
        <AppRouter />
    </UserProvider>
  );
}

export default App;
