import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeContext from './contexts/ThemeContext'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'
import SidePanelContextProvider from './contexts/SidePanelContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContext>
      <BrowserRouter>
       <AuthContextProvider>
          <SidePanelContextProvider>
            <App />
          </SidePanelContextProvider>
       </AuthContextProvider>
      </BrowserRouter>
    </ThemeContext>
  </StrictMode>
)
