import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import { useState } from 'react'
import Input from './Input'
import PassInput from './PassInput'

const SignUpForm = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")
  
  return (
    <div className='flex flex-col items-center gap-2'>
                    {/* Enter Credentials and Sign up */}
                    
                  <Input type="text" placeholder='enter your name' className='bg-primary rounded w-full p-1'  value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
                  <Input type="email" placeholder={'enter email'} className='bg-primary rounded w-full p-1' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                  <PassInput type="password" placeholder={'enter password'} className='bg-primary rounded w-full p-1'value={password} onChange={(e)=>{setPassword(e.target.value)}}
              
                  />
                  <PassInput type="password" placeholder={'confirm password'} className='bg-primary rounded w-full p-1' value={confPassword } onChange={(e)=>{setConfPassword(e.target.value)}}
              
                  />
                  
                  <Button value="Sign Up" onClick={()=>{
                    // console.log("jijaji")
                  }}/>
                    {/* Sign In Instead */}
                       <div className='flex gap-2 text-[.8rem] justify-center items-center'>
                  <p>Already have an account?</p>
                  {/* <a href="" >Sign In</a> */}
                  <Link to='/signin' className='text-blue-700 underline'>Sign in</Link>
                </div>
                  
        </div>
  )
}

export default SignUpForm
