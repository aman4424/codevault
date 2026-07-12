import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import Input from './Input'
import PassInput from './PassInput'
import { useState } from 'react'
const SignInForm = () => {
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    const [formData, setFormData ] = useState({
      email:"",
      password:""
    })

    const [errors, setErrors] = useState({
        email: "",
        
      })
    const validateEmail=(email)=>{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      setErrors((prev)=>({
        ...prev,email:emailRegex.test(email)?"": "Please enter a valid email address.",
      }))
    }
    const handleChange = (field) => (e) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === 'email') {
      validateEmail(value)
    }
    console.log(errors)
  }
    
  return (
    <div>
        <div className='flex flex-col items-center gap-2'>
                  <Input type="text" placeholder={'enter email'} className='bg-primary rounded w-full p-1' value={formData.email} onChange={handleChange("email")}/>
                  <PassInput type="password" placeholder={'enter password'} className='bg-primary rounded w-full p-1' value={formData.password} onChange={handleChange("password")}
              />
                  
                </div>
                {/* forgot password and sign in  */}
                <div className='flex justify-between items-baseline mt-4'>
                  <a href="" className='decoration-1 underline text-blue-700'>forgot password?</a>
                  <Button value="Sign in" />
                </div>
                {/* sign up */}
                <div className='flex gap-2 text-[.8rem] justify-center items-center'>
                  <p>new user?</p>
                  {/* <a href="" Sign Up</a> */}
                  <Link to='/signup' className='text-blue-700 underline'>sign Up</Link>
                </div>
    </div>
        
  )
}

export default SignInForm
