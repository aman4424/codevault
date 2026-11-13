import React from 'react'
import { useContext } from 'react'
import { ThemeContextData } from '../contexts/ThemeContext'
import useTheme from '../hooks/useTheme'
const ToggleButton = () => {
const[theme,setTheme]=useTheme()
  return (
    <div>
      <button
       className=' rounded-full border-none  '
       onClick={()=>{
            setTheme((theme)=>(theme==='dark'?'light':'dark'))
       }}
      >
        {theme==='dark'?"☀️":"🌙"}
      </button>
    </div>
  )
}

export default ToggleButton
