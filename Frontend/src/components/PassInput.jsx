import React from 'react'
import {Eye,EyeOff} from 'lucide-react'
import { useState } from 'react'
const PassInput = (props) => {
  const [visEye, setVisEye] = useState('')
  const [visEyeOff, setVisEyeOff] = useState("hidden")
  const [type, setType] = useState("password")
  return (
    <div className='bg-primary rounded w-full p-1 flex justify-center items-center focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--primary)]'>
      <input
        type={type}
        className='bg-primary rounded w-full p-1 outline-0 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]'
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />

      <Eye 
      className={`${visEye} cursor-pointer `}
       onClick={()=>{
        // if(props.value.length==0)return;
        setVisEye('hidden')
        setVisEyeOff("")
        setType("text")
       }}
       
       
       />
      <EyeOff 
      className={`${visEyeOff} cursor-pointer `}
       onClick={()=>{
        setVisEye("")
        setVisEyeOff("hidden")
        setType("password")
      }}

      />
    </div>
  )
}

export default PassInput
