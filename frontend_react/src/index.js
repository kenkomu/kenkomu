import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App.js";
import './index.css';

// Set initial theme to dark
document.documentElement.setAttribute('data-theme', 'dark');

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

