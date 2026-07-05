import React from 'react'
import Splash from './pages/Splash'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
const App = () => {
  return (
    <div>
      <Navbar/>
      <SignUpPage/>
      <SignInPage/>
    </div>
  )
}

export default App
