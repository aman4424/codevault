import React from 'react'
import logo from '../assets/logo.png'
import { useContext } from 'react'
import { ThemeContextData } from '../contexts/ThemeContext'
import ToggleButton from './ToggleButton'
import useTheme from '../hooks/useTheme'
const Navbar = () => {
  // const [theme,setTheme]=useTheme()
  return (
    <div>
      <div className="bg-surface flex h-10 justify-between items-center px-5 py-7">
        <div className="min-w-40 w-60  ">
            <img src={logo} alt="" className='h-full w-full  ' />
        </div>

        <div className='flex gap-5'>
            <ul>Notebook</ul>
            <ul>Problems</ul>
            <ul>Profile</ul>
            <ToggleButton/>
            
        </div>
      </div>
    </div>
  )
}

export default Navbar
