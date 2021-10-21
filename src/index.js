import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import CryptoContext from "./CryptoContext";

ReactDOM.render(
  <CryptoContext>
    <App />
  </CryptoContext>,
  document.getElementById("root")
);
