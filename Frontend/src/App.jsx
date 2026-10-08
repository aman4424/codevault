import React from 'react'
import Splash from './pages/Splash'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import { Routes, Route } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import DashBoard from './pages/DashBoard'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'
const App = () => {
  return (
    <div>

       <Navbar /> 
      <Routes>
        <Route path='/' element={<Splash />} />
        <Route path='/signin' element={<PublicRoute>
          <SignInPage/>
        </PublicRoute>
      } />
        <Route path='/signup' element={<PublicRoute>
          <SignUpPage />
        </PublicRoute>} />
        <Route path='/forgot-password' element={<PublicRoute>
          <ForgotPassword />
        </PublicRoute>} />
        <Route path='/reset-password/:token' element={<PublicRoute>
          <ResetPassword />
        </PublicRoute>} />
        <Route path='/dashboard' element={<PrivateRoute>
          <DashBoard />
        </PrivateRoute>} />
      </Routes>

      



    </div>
  )
}

export default App
