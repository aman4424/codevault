import React from 'react'
import Button from './Button'
const SignInForm = () => {
  return (
    <div>
        <div className='flex flex-col items-center gap-2'>
                  <input type="text" placeholder={'enter email'} className='bg-primary rounded w-full p-1' />
                  <input type="password" placeholder={'enter password'} className='bg-primary rounded w-full p-1' />
                  
                </div>
                {/* forgot password and sign in  */}
                <div className='flex justify-between items-baseline mt-4'>
                  <a href="" className='decoration-1 underline text-blue-700'>forgot password?</a>
                  <Button value="Sign in" />
                </div>
                {/* sign up */}
                <div className='flex gap-2 text-[.8rem] justify-center items-center'>
                  <p>new user?</p>
                  <a href="" className='text-blue-700 underline'>Sign Up</a>
                </div>
    </div>
        
  )
}

export default SignInForm
