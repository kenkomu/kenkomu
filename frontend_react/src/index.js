// frontend_react/src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';  // Updated import
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);  // Create a root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);