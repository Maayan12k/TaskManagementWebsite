import React from 'react';
import ReactDOM from 'react-dom/client';
import '@cloudscape-design/global-styles/index.css';
import { ClerkScriptLoader } from './authentication/ClerkScriptLoader';
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom';
import { Home } from './components/landing-page';
import { SignUpPage } from './components/sign-up/SignUpPage';
import { LogInPage } from './components/log-in/LogInPage';
import NotFoundRedirect from './components/error-page/NotFoundRedirect';
import { Dashboard } from './components/dashboard/Dashboard';
import { ClerkProvider } from '@clerk/clerk-react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundRedirect />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/log-in",
    element: <LogInPage />,
  },
  {
    path: "/dashboard/:id",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkScriptLoader />
    <ClerkProvider publishableKey={`pk_test_aGVscGluZy1zb2xlLTM4LmNsZXJrLmFjY291bnRzLmRldiQ`}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
