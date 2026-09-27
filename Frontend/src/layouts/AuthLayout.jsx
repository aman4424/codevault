import React from 'react'
import Button from '../components/Button'
const AuthLayout = (props) => {
  return (
    // responsive page layout
      <div className="min-h-screen flex flex-col items-center justify-center p-12 bg-background">
            {/* Auth card heading */}
            {/* <div className="w-full max-w-md rounded-t-2xl border-b-gray-400 border-b-1  shadow-xl ">
                  <div className=" p-3 top-0 rounded-t-2xl text-2xl underline decoration-1 bg-surface ">
                  Sign In
                </div>
            </div> */}

            {/*Auth Card layout*/}
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-xl relative">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-semibold text-text">
                   {props.heading}
                  </h1>
                  <p className="text-sm text-muted mt-2">
                    {props.description}
                  </p>

                  <hr className="border-border mt-4 my-5" />
 
</div>
            
                {/* Card Contents  */}
                {props.children}
               
            </div>   
         
         
    </div>
  )
}

export default AuthLayout
