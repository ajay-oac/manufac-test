import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

/**
 * The entry point.
 * Mounts the main app in the root (div#root) node of DOM.
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
