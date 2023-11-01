import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";

import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./contexts/GlobalContext.jsx";
import { NextUIProvider } from "@nextui-org/system";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <NextUIProvider>
          <ThirdwebProvider
            activeChain={PolygonZkevmTestnet}
            clientId={import.meta.env.VITE_CLIENT_ID}
          >
            <App />
          </ThirdwebProvider>
        </NextUIProvider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
