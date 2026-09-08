import React from 'react'
import {Eye,EyeOff} from 'lucide-react'
import { useState } from 'react'
const PassInput = (props) => {
  const [visEye, setVisEye] = useState('')
  const [visEyeOff, setVisEyeOff] = useState("hidden")
  const [type, setType] = useState("password")
  return (
    <div className="w-full">
      <p className='text-[var(--text)] text-base '>{props.fieldName}:</p>
      <div className='bg-surface mt-2 rounded w-full p-1 flex justify-center items-center focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-border '>
      <input
        type={type} className='bg-surface rounded w-full p-1 outline-0 text-sm'
        
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />

      <Eye 
      className={`${visEye} cursor-pointer h-6 text-[var(--muted)]`}
       onClick={()=>{
        // if(props.value.length==0)return;
        setVisEye('hidden')
        setVisEyeOff("")
        setType("text")
       }}
       
       
       />
      <EyeOff 
      className={`${visEyeOff} cursor-pointer h-6 text-[var(--muted)]`}
       onClick={()=>{
        setVisEye("")
        setVisEyeOff("hidden")
        setType("password")
      }}

      />
    </div>
    </div>
  )
}

export default PassInput
