import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Button from '../components/Button'
// import SignInCard from '../components/SignInCard'
import SignInForm from '../components/SignInForm'
const SignInPage = () => {
   
    return(
        //  <div>
        //     <SignInCard/>
        //  </div>
         <AuthLayout>
          <SignInForm/>
      </AuthLayout>
    )
}

export default SignInPage
