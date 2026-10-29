// frontend_react/src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';  // Updated import
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Base styles load first so component styles can build on them
import './index.css';
import App, { routes } from './App';

// A data router: needed for view transitions (project covers morphing into project pages)
const router = createBrowserRouter([{ element: <App />, children: routes }]);

const container = document.getElementById('root');
const root = createRoot(container);  // Create a root

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
