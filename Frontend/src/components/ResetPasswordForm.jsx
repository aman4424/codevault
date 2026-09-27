import { useParams } from "react-router-dom"
import Button from "./Button";
import PassInput from "./PassInput";
import { useState } from "react";
import axios from "axios";
const ResetPasswordForm = () => {
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
    } catch (error) {
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
      <Button value="Reset Password" onClickAction={onClickAction}/>
      <div className={`text-red-700 text-[0.9rem] flex items-center justify-around`}>
        {backendError}
      </div>
      <div className={`text-green-700 text-[0.9rem] flex items-center justify-around`}>
        {backendMessage}
      </div>
    </div>
    
  )
}

export default ResetPasswordForm
