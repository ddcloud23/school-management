import React from "react";
import App from "./App";
import './index.css'
import { DarkModeContextProvider } from "./context/darkModeContext";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'





createRoot(document.getElementById('root')).render(
  <StrictMode>
     <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </StrictMode>,
)
