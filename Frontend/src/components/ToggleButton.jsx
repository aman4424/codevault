import React from 'react'
import { useContext } from 'react'
import { ThemeContextData } from '../contexts/ThemeContext'
import useTheme from '../hooks/useTheme'
const ToggleButton = () => {
const[theme,setTheme]=useTheme()
  return (
    <div>
      <button
       className='bg-primary rounded  '
       onClick={()=>{
            setTheme((theme)=>(theme==='dark'?'light':'dark'))
       }}
      >
        Toggle Theme
      </button>
    </div>
  )
}

export default ToggleButton
