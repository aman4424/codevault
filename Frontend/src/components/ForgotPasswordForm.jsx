import Input from "./Input"
import Button from "./Button"
import { useState } from "react"
import axios from "axios";
const ForgotPasswordForm = () => {
    const [formData, setFormData ] = useState({
          email:"",
          
        })
    
        const [errors, setErrors] = useState({
            email: "",
            
          })
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
      const sendData=async()=>{
        axios.post("http://localhost:5000/api/auth/forgot-password",{email:formData.email})
        
        // console.log("BUTTON WORKS");
        
        
        // console.log("hii")
      }
  return (
    <div className="flex flex-col items-center">
       <Input fieldName='Enter email ' type='email' placeholder='enter your email' value={formData.email} onChange={handleChange("email")}/>
       <div className={`text-red-700 text-[0.9rem]`}>
        {errors.email}
      </div>
    <div className="flex mt-4 items-center justify-center">
        
    <Button value='Send reset Link' onClickAction={sendData}/>

    </div>
    
    </div>
  )
}

export default ForgotPasswordForm
