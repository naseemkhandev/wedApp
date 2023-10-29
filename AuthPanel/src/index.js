import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import styles from './styles.css'
import { DarkModeContextProvider } from "./context/darkModeContext";
import { UserDataProvider } from "./context/UserDataProvider";

ReactDOM.render(
  <React.StrictMode>
     <UserDataProvider>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
    </UserDataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
