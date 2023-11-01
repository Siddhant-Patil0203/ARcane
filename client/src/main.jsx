import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./contexts/GlobalContext.jsx";
import { NextUIProvider } from "@nextui-org/system";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <NextUIProvider>
            <App />
        </NextUIProvider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
