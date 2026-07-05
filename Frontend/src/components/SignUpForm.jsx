import React from 'react'
import Button from './Button'
const SignUpForm = () => {
  return (
    <div className='flex flex-col items-center gap-2'>
                    {/* Enter Credentials and Sign up */}
                  <input type="text" placeholder='enter your name' className='bg-primary rounded w-full p-1'/>
                  <input type="text" placeholder={'enter email'} className='bg-primary rounded w-full p-1' />
                  <input type="password" placeholder={'enter password'} className='bg-primary rounded w-full p-1' />
                  <input type="password" placeholder={'confirm password'} className='bg-primary rounded w-full p-1' />

                  <Button value="Sign Up"/>
                    {/* Sign In Instead */}
                       <div className='flex gap-2 text-[.8rem] justify-center items-center'>
                  <p>Already have an account?</p>
                  <a href="" className='text-blue-700 underline'>Sign In</a>
                </div>
                  
        </div>
  )
}

export default SignUpForm
