import React from 'react'
import Button from './Button'
const SignInCard = () => {
  return (

   
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* sign in heading */}
            {/* <div className="w-full max-w-md rounded-t-2xl border-b-gray-400 border-b-1  shadow-xl ">
                  <div className=" p-3 top-0 rounded-t-2xl text-2xl underline decoration-1 bg-surface ">
                  Sign In
                </div>
            </div> */}

            {/*sign in hero*/}
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-xl relative">
                {/* enter credentials */}
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

         
         
    </div>
  )
}

export default SignInCard

