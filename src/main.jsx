import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CtfProvider } from './context/CtfContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CtfProvider>
      <App />
    </CtfProvider>
  </React.StrictMode>,
)
