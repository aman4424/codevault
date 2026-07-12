import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import Input from './Input'
import PassInput from './PassInput'
import { useState } from 'react'
const SignInForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  return (
    <div>
        <div className='flex flex-col items-center gap-2'>
                  <Input type="text" placeholder={'enter email'} className='bg-primary rounded w-full p-1' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                  <PassInput type="password" placeholder={'enter password'} className='bg-primary rounded w-full p-1' value={password} onChange={(e)=>{setPassword(e.target.value)}}
              />
                  
                </div>
                {/* forgot password and sign in  */}
                <div className='flex justify-between items-baseline mt-4'>
                  <a href="" className='decoration-1 underline text-blue-700'>forgot password?</a>
                  <Button value="Sign in" />
                </div>
                {/* sign up */}
                <div className='flex gap-2 text-[.8rem] justify-center items-center'>
                  <p>new user?</p>
                  {/* <a href="" Sign Up</a> */}
                  <Link to='/signup' className='text-blue-700 underline'>sign Up</Link>
                </div>
    </div>
        
  )
}

export default SignInForm
