import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import { useState } from 'react'
import Input from './Input'
import PassInput from './PassInput'

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setErrors((prev) => ({
      ...prev,
      email: emailRegex.test(email) ? "" : "Please enter a valid email address.",
    }))
  }

  const handleChange = (field) => (e) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === 'email') {
      validateEmail(value)
    }
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      {/* Enter Credentials and Sign up */}
      <Input
        type="text"
        placeholder='enter your name'
        className='bg-primary rounded w-full p-1'
        value={formData.userName}
        onChange={handleChange('userName')}
      />
      <Input
        type="email"
        placeholder='enter email'
        className='bg-primary rounded w-full p-1'
        value={formData.email}
        onChange={handleChange('email')}
      />
      {errors.email && <p className='text-red-500 text-sm self-start'>{errors.email}</p>}
      <PassInput
        type="password"
        placeholder='enter password'
        className='bg-primary rounded w-full p-1'
        value={formData.password}
        onChange={handleChange('password')}
      />
      <PassInput
        type="password"
        placeholder='confirm password'
        className='bg-primary rounded w-full p-1'
        value={formData.confirmPassword}
        onChange={handleChange('confirmPassword')}
      />

      <Button value="Sign Up" onClick={() => {}} />

      {/* Sign In Instead */}
      <div className='flex gap-2 text-[.8rem] justify-center items-center'>
        <p>Already have an account?</p>
        <Link to='/signin' className='text-blue-700 underline'>Sign in</Link>
      </div>
    </div>
  )
}

export default SignUpForm
