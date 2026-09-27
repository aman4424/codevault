import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Button from '../components/Button'
import SignUpForm from '../components/SignUpForm'
const SignUpPage = () => {
  return (
    <div>
      <AuthLayout heading="Create your CodeVault account" description="Start organizing your knowledge and keep your learning in one place.">
       <SignUpForm/>
      </AuthLayout>
    </div>
  )
}

export default SignUpPage
