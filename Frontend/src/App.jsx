import React from 'react'
import Splash from './pages/Splash'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Splash />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
       
        
      </Routes>
    </div>
  )
}

export default App
