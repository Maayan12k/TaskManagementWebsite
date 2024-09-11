import React from 'react';
import ReactDOM from 'react-dom/client';
import '@cloudscape-design/global-styles/index.css';
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from './components/home-page';
import { SignUpPage } from './components/sign-up/SignUpPage';
import { SignInPage } from './components/sign-in/SignInPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import RootLayout from './layouts/root-layout'
import DashboardLayout from './layouts/dashboard-layout'

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
