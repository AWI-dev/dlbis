import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Router>
        <App />
      </Router>
    </NextUIProvider>
  </React.StrictMode>
);
