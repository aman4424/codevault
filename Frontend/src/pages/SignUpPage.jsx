import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Button from '../components/Button'
import SignUpForm from '../components/SignUpForm'
const SignUpPage = () => {
  return (
    <div>
      <AuthLayout>
       <SignUpForm/>
      </AuthLayout>
    </div>
  )
}

export default SignUpPage
