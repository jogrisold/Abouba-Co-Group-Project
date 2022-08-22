import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import { StoreProvider } from "./components/StoreContext";
import { UserProvider } from "./components/UserContext";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </StoreProvider>
  </React.StrictMode>,
  rootElement
);
