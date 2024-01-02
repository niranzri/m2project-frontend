import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import FlightsContextProvider from './contexts/FlightsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FlightsContextProvider>
        <App />
      </FlightsContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
