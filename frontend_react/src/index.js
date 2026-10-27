// frontend_react/src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';  // Updated import
// Base styles load first so component styles can build on them
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);  // Create a root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);