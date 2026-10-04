import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import Input from './Input'
import PassInput from './PassInput'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const SignInForm = () => {
    const navigate=useNavigate();
    const [formData, setFormData ] = useState({
      email:"",
      password:""
    })

    const [errors, setErrors] = useState({
        email: "",
        
      })
    const [backendError, setBackendError] = useState("")
    const [backendMessage, setBackendMessage] = useState("")
     const [showRedirectModal, setShowRedirectModal] = useState(false)
     const [disableButton, setDisableButton] = useState(false)
     const [loading, setLoading] = useState(false)
     const [buttonValue, setButtonValue] = useState(<p>Sign In</p>)
    
     useEffect(
      ()=>{
        if(loading===true){
          setDisableButton(true);
          setButtonValue(<div className='flex  justify-center items-center gap-2 '>
          <div className=' h-5 w-5 border-2 border-border border-t-primary rounded-full animate-spin  flex items-center justify-center'></div>
          <p>Signing In</p>
          </div>
                          
          )
        }
        else{
          setDisableButton(false)
          setButtonValue(<p>Sign In</p>)
        }
      }
     ,[loading])
    
    



    const validateEmail=(email)=>{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      setErrors((prev)=>({
        ...prev,email:emailRegex.test(email)||email.length===0?"": "Please enter a valid email address.",
      }))
    }
    const handleChange = (field) => (e) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === 'email') {
      validateEmail(value)
    }
   
  }
  const onClickAction=async()=>{
    try {
      setBackendError("")
      setBackendMessage("")
      const response = await axios.post('http://localhost:5000/api/auth/login', {
       email:formData.email,
       password:formData.password

     });
     setBackendMessage(response.data?.message)
     setLoading(false)
      setShowRedirectModal(true)
        setTimeout(() => {
          navigate('/')
        }, 1000);
   
    } catch (error) {
      setLoading(false)
      setBackendError(error.response?.data?.message)
      console.log(error.response?.data?.message); 
    }
  }
    
  return (
    <div>
        <div className='flex flex-col items-center gap-2'>
                  <Input type="text" placeholder={'enter email'} fieldName="Enter Email "className='bg-surface rounded w-full p-1' value={formData.email} onChange={handleChange("email")}/>
                  <div className={`text-red-700 text-[0.9rem]`}>
        {errors.email}
      </div> 
                  <PassInput type="password" placeholder={'enter password'} className='bg-surface rounded w-full p-1' value={formData.password} fieldName="Enter Password " onChange={handleChange("password")}
              />
                 
                </div>

                

                {/* forgot password and sign in  */}
                <div className='flex justify-between items-baseline mt-4'>
                  <Link to='/forgot-password' className='decoration-1 underline text-blue-700'>forgot password?</Link>
                  <Button value={buttonValue} disabled={disableButton} onClickAction={onClickAction}/>
                  
                </div>
                <div className={`text-red-700 text-[0.9rem] flex items-center justify-around`}>
                  {backendError}
                  </div>
                  <div className={`text-green-700 text-[0.9rem] flex items-center justify-around`}>
                    {backendMessage}
                  </div>
                {/* sign up */}
                <div className='flex gap-2 text-[.8rem] justify-center items-center'>
                  <p>new user?</p>
                  <Link to='/signup' className='text-blue-700 underline'>sign Up</Link>
                </div>
                {showRedirectModal&&(
                 <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/60 '>
                 <div className='w-[50%] bg-surface min-h-[40%] flex justify-center items-center flex-col rounded-2xl'>

                 <p>✓ Logged In!</p>
                 <p>Let's get your CodeVault workspace ready...</p>
                 <div className=' h-10 w-10 border-2 border-border border-t-primary rounded-full animate-spin mt-3 '>

                </div>
              </div>
          </div>
       )}
    </div>
        
  )
}

export default SignInForm
