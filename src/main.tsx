import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import LandingPage from "./components/main/index"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <LandingPage />
  </React.StrictMode>,
)
