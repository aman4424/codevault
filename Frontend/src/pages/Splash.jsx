import React from 'react'
import logo from '../assets/logo.png'
const Splash = () => {
  return (
    <div className='relative h-screen'>
      <div className=' absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '>
      <img src={logo} alt="splash" className='w-full h-fit object-contain ' />
      
    </div>
    </div>
  )
}

export default Splash
