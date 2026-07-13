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
    userName:"",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setErrors((prev) => ({
      ...prev,
      email: emailRegex.test(email)||email.length===0 ? "" : "Please enter a valid email address.",
    }))
  }

  const validatePassword=(password)=>{
    if(password.length<8&&password.length>0)
      setErrors((prev)=>({
        ...prev,
        password:"Password should be atleast 8 characters long."
    }))
    else setErrors((prev)=>({
        ...prev,
        password:""
    }))
  }
  const validateConfirmPassword=(password)=>{
    if(formData.password!=password) {
      setErrors((prev)=>({
          ...prev,
          confirmPassword:"Passwords do not match."
      }))
    }
    else {
      setErrors((prev)=>({
          ...prev,
          confirmPassword:""
      }))
    }
  }
  
  const validateUserName=(name)=>{
      setErrors((prev)=>({
        ...prev,userName:name.length===0?"*Required":" "
      }))
      
  }
  const handleChange = (field) => (e) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === 'email') {
      validateEmail(value)
    }
    if(field==='password'){
      validatePassword(value)
    }
    if(field ==='confirmPassword'){
      validateConfirmPassword(value)
    }
    if(field==='userName'){
      validateUserName(value)
    }
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      {/* Enter Credentials and Sign up */}
      
        <Input
        type="text"
        placeholder='enter your name'
        className='bg-primary rounded w-full p-1 '
        value={formData.userName}
        onChange={handleChange('userName')}
      />
     
       <div className={`text-red-700 text-[0.9rem]`}>
        {errors.userName}
      </div>
       
      <Input
        type="email"
        placeholder='enter email'
        className='bg-primary rounded w-full p-1'
        value={formData.email}
        onChange={handleChange('email')}
      />
      
      {/* {errors.email && <p className='text-red-500 text-sm self-start'>{errors.email}</p>} */}
      <div className={`text-red-700 text-[0.9rem]`}>
        {errors.email}
      </div>
      <PassInput
        type="password"
        placeholder='enter password'
        className='bg-primary rounded w-full p-1'
        value={formData.password}
        onChange={handleChange('password')}
      />
      <div className={`text-red-700 text-[0.9rem]`}>
        {errors.password}
      </div>
      <PassInput
        type="password"
        placeholder='confirm password'
        className='bg-primary rounded w-full p-1'
        value={formData.confirmPassword}
        onChange={handleChange('confirmPassword')}
      />
      <div className={`text-red-700 text-[0.9rem]`}>
        {errors.confirmPassword}
      </div>

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
