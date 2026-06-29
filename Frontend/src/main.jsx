import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeContext from './contexts/ThemeContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeContext>
    <App/>
  </ThemeContext>
)
