import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ModeContextProvider } from "./context/context-mode";
import { CountriesProvider } from "./context/context-countries";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <ModeContextProvider>
      <CountriesProvider>
        <App />
      </CountriesProvider>
    </ModeContextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
