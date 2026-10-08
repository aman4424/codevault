import React, { useEffect } from 'react'
import { Link, replace } from 'react-router-dom'
import Button from './Button'
import { useState } from 'react'
import Input from './Input'
import PassInput from './PassInput'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
const SignUpForm = () => {
  const navigate =useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    name:"",
    email: "",
    password: "",
    confirmPassword: "",
  })

 const [backendError, setBackendError] = useState("")
 const [backendMessage, setBackendMessage] = useState("")
 const [showRedirectModal, setShowRedirectModal] = useState(false)
 const [disableButton, setDisableButton] = useState(false)
 const [loading, setLoading] = useState(false)
 const [buttonValue, setButtonValue] = useState(<p>Sign Up</p>)
 const {authStatus,setAuthStatus,user,setUser}=useAuth()
 useEffect(
  ()=>{
    if(loading===true){
      setDisableButton(true);
      setButtonValue(<div className='flex  justify-center items-center gap-2 '>
      <div className=' h-5 w-5 border-2 border-border border-t-primary rounded-full animate-spin  flex items-center justify-center'></div>
      <p>Signing Up</p>
      </div>
                      
      )
    }
    else{
      setDisableButton(false)
      setButtonValue(<p>Sign Up</p>)
    }
  }
 ,[loading])




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
  
  const validateName=(name)=>{
      setErrors((prev)=>({
        ...prev,name:name.length===0?"*Required":" "
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
    if(field==='name'){
      validateName(value)
  }
  }
  const sendData=async()=>{
    try {
        setBackendError("")
        setBackendMessage("")
        setLoading(true)
        // console.log("signupfrontend")
        const response= await axios.post("http://localhost:5000/api/auth/register",{
        name:formData.name,
        email:formData.email,
        password:formData.password
        });
        setLoading(false)
        // console.log(response);
        
        setBackendMessage(response.data?.message)
        localStorage.setItem("token",response.data.token);
        console.log(backendMessage)
        setShowRedirectModal(true)
        setTimeout(() => {
          setAuthStatus("authorized"); 
          navigate('/dashboard')
        }, 1000);
    } catch (error) {
          setLoading(false)
         console.log("STATUS:", error.response?.status);
         console.log("DATA:", error.response?.data);
         console.log("MESSAGE:", error.response?.data?.message);
         setBackendError(error.response?.data?.message)
         console.log(backendError)
    }
  }
  return (
    <div className='flex d  flex-col items-center gap-2'>
      {/* Enter Credentials and Sign up */}
      
        
        <Input
        type="text"
        placeholder='enter your name'
        fieldName="Enter your name "
        className='bg-primary rounded w-full p-1 '
        value={formData.name}
        onChange={handleChange('name')}
      />
     
       <div className={`text-red-700 text-[0.9rem]`}>
        {errors.name}
      </div>
       
      <Input
        type="email"
        placeholder='enter email'
        fieldName="Enter your email "
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
        fieldName="Enter Password "
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
        fieldName="Confirm Password "
        className='bg-primary rounded w-full p-1'
        value={formData.confirmPassword}
        onChange={handleChange('confirmPassword')}
      />
      <div className={`text-red-700 text-[0.9rem]`}>
        {errors.confirmPassword}
      </div>


      <Button value={buttonValue} disabled={disableButton} onClickAction={sendData} />

      <div className={`text-red-700 text-[0.9rem]`}>
        {backendError}
      </div>
      <div className={`text-green-700 text-[0.9rem] flex items-center justify-around`}>
        {backendMessage}
      </div>

      {/* Sign In Instead */}
      <div className='flex gap-2 text-[.8rem] justify-center items-center'>
        <p>Already have an account?</p>
        <Link to='/signin' className='text-blue-700 underline'>Sign in</Link>
      </div>

      {showRedirectModal&&(
          <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/60 '>
              <div className='w-[50%] bg-surface min-h-[40%] flex justify-center items-center flex-col rounded-2xl'>

                <p>✓ Account created!</p>
                <p>Let's get your CodeVault workspace ready...</p>
                <div className=' h-10 w-10 border-2 border-border border-t-primary rounded-full animate-spin mt-3 '>

                </div>
              </div>
          </div>
       )}
    </div>
  )
}

export default SignUpForm;
