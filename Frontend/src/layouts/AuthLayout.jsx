import React from 'react'
import Button from '../components/Button'
const AuthLayout = (props) => {
  return (
    // responsive page layout
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Auth card heading */}
            {/* <div className="w-full max-w-md rounded-t-2xl border-b-gray-400 border-b-1  shadow-xl ">
                  <div className=" p-3 top-0 rounded-t-2xl text-2xl underline decoration-1 bg-surface ">
                  Sign In
                </div>
            </div> */}

            {/*Auth Card layout*/}
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-xl relative">
            
                {/* Card Contents  */}
                {props.children}
               
            </div>   
         
         
    </div>
  )
}

export default AuthLayout
