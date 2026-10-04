import { useNavigate, useParams } from "react-router-dom"
import Button from "./Button";
import PassInput from "./PassInput";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const ResetPasswordForm = () => {
    const navigate=useNavigate();
    const {token}=useParams();
    const [formData, setFormData] = useState({
        
        password: "",
        confirmPassword: "",
      })
    
      const [errors, setErrors] = useState({
        
        password: "",
        confirmPassword: "",
      })
      const [backendError, setBackendError] = useState("")  
      const [backendMessage, setBackendMessage] = useState("")
            const [showRedirectModal, setShowRedirectModal] = useState(false)
           const [disableButton, setDisableButton] = useState(false)
           const [loading, setLoading] = useState(false)
           const [buttonValue, setButtonValue] = useState(<p>Reset Password</p>)
          
           useEffect(
            ()=>{
              if(loading===true){
                setDisableButton(true);
                setButtonValue(<div className='flex  justify-center items-center gap-2 '>
                <div className=' h-5 w-5 border-2 border-border border-t-primary rounded-full animate-spin  flex items-center justify-center'></div>
                <p>Resetting Password</p>
                </div>
                                
                )
              }
              else{
                setDisableButton(false)
                setButtonValue(<p>Reset Password</p>)
              }
            }
           ,[loading])
          
          
      
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
 const handleChange = (field) => (e) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))

    
    if(field==='password'){
      validatePassword(value)
    }
    if(field ==='confirmPassword'){
      validateConfirmPassword(value)
    }
    
}
const onClickAction= async()=>{
    try {
      setBackendError("")
      setBackendMessage("")
      const response= await axios.post("http://localhost:5000/api/auth/reset-password",{
        
        token,
        password:formData.password
        
    })
    console.log(response.data?.message)
    setBackendMessage(response.data?.message)
    setLoading(false)
      setShowRedirectModal(true)
        setTimeout(() => {
          navigate('/signin')
        }, 1000);
   


    } catch (error) {
      setLoading(false)
      setBackendError(error.response?.data?.message)
      console.log(error)
    }
}
  return (
    <div className="flex flex-col items-center">
        <PassInput 
        fieldName="Enter new Password "
        placeholder="Enter new Password"
        value={formData.password}
        onChange={handleChange('password')}
        
        />
        <div className={`text-red-700 text-[0.9rem] mt-2`}>
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
          <div className={`text-red-700 text-[0.9rem] mt-2`}>
        {errors.confirmPassword}
      </div>
      <Button value={buttonValue} disabled={disableButton} onClickAction={onClickAction}/>
      <div className={`text-red-700 text-[0.9rem] flex items-center justify-around`}>
        {backendError}
      </div>
      <div className={`text-green-700 text-[0.9rem] flex items-center justify-around`}>
        {backendMessage}
      </div>

      {showRedirectModal&&(
                 <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/60 '>
                 <div className='w-[50%] bg-surface min-h-[40%] flex justify-center items-center flex-col rounded-2xl'>

                 <p>✓ Reset Successful!</p>
                 <p>Redirecting to Sign In...</p>
                 <div className=' h-10 w-10 border-2 border-border border-t-primary rounded-full animate-spin mt-3 '>

                </div>
              </div>
          </div>
       )}

    </div>
    
  )
}

export default ResetPasswordForm
