import React from 'react';
import ReactDOM from 'react-dom/client';
import '@cloudscape-design/global-styles/index.css';
import { ClerkScriptLoader } from './authentication/ClerkScriptLoader';
import { App } from './App';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkScriptLoader />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
