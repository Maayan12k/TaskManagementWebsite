import React from 'react'
import ReactDOM from 'react-dom/client'
import "@cloudscape-design/global-styles/index.css"

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/landing-page'
import { LoginPage } from './components/log-in/LoginPage'
import NotFoundRedirect from './components/error-page/NotFoundRedirect'
import { SignUpPage } from './components/sign-up/SignUpPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFoundRedirect />,
  },
  {
    path: '/log-in',
    element: <LoginPage/>,
  },
  {
    path: '/sign-up',
    element: <SignUpPage/>,
  },
  {
    path: '/dashboard/:userName',
    element: <></>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
