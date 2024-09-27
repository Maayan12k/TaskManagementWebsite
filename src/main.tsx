import React from 'react';
import ReactDOM from 'react-dom/client';
import '@cloudscape-design/global-styles/index.css';
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './layouts/root-layout'
import DashboardLayout from './layouts/dashboard-layout'
import { HomePage } from './components/pages/home-page/HomePage';
import { SignInPage } from './components/pages/sign-in/SignInPage';
import { SignUpPage } from './components/pages/sign-up/SignUpPage';
import { DashboardPage } from './components/pages/dashboard/DashboardPage';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/*', element: <HomePage /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        path: 'dashboard',
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
