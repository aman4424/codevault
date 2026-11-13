import React from 'react'
import logo from '../assets/logo-navbar.png'
import { useContext } from 'react'
import { ThemeContextData } from '../contexts/ThemeContext'
import ToggleButton from './ToggleButton'
import useTheme from '../hooks/useTheme'
import { Menu } from 'lucide-react';
import useViewSidePanel from '../hooks/useViewSidePanel'
const Navbar = () => {
  const {viewSidePanel,setViewSidePanel}=useViewSidePanel()
  // const [theme,setTheme]=useTheme()
  return (
    <div>
     
      <div className="bg-card flex h-10 justify-between items-center px-3 py-7 w-full ">
         <div className='flex items-center justify-center gap-0'>
          <button onClick={() => setViewSidePanel((isVisible) => !isVisible)}>
            <Menu></Menu>
          </button>
          {/* {viewSidePanel==true?"x":"e"} */}
           <div className="w-36 h-10 flex items-center justify-center">
              <img src={logo} alt="CodeVault" className="w-full h-full object-contain" />
           </div>
         </div>

        <div className='flex gap-5'>
            
            <ul>Profile</ul>
            <ToggleButton/>
            
        </div>
      </div>
    </div>
  )
}

export default Navbar
