import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Splash from './pages/Splash'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import DashBoard from './pages/DashBoard'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'
import AppLayout from './layouts/AppLayout'
import NoteBookPage from './pages/NoteBookPage'
import Settings from './pages/Settings'
import Analytics from './pages/Analytics'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<PublicRoute>
          <Splash/>
        </PublicRoute>
        } />
        <Route path='signin' element={<PublicRoute>
          <SignInPage/>
        </PublicRoute>} />
        <Route path='signup' element={<PublicRoute>
          <SignUpPage />
        </PublicRoute>} />
        <Route path='forgot-password' element={<PublicRoute>
          <ForgotPassword />
        </PublicRoute>} />
        <Route path='reset-password/:token' element={<PublicRoute>
          <ResetPassword />
        </PublicRoute>} />
        <Route path='dashboard' element={<PrivateRoute>
          <DashBoard />
        </PrivateRoute>} />
        <Route path='notebooks' element={
        <PrivateRoute>
          <NoteBookPage/>
        </PrivateRoute>
       }/>
        <Route path='analytics' element={
        <PrivateRoute>
          <Analytics/>
        </PrivateRoute>
       }/>
        <Route path='settings' element={
        <PrivateRoute>
          <Settings/>
        </PrivateRoute>
       }/>
       </Route>
       
          
       
       
    </Routes>
  )
}

export default App
