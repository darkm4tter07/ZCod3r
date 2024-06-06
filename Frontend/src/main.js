import React from 'react'
import ReactDOM from 'react-dom/client'
import './config/firebase-config.js'
import App from './App.js'
import './index.css'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
