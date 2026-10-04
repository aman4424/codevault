import Input from "./Input"
import Button from "./Button"
import { useState } from "react"
import axios from "axios";
import { useEffect } from "react";
const ForgotPasswordForm = () => {
    const [formData, setFormData ] = useState({
          email:"",
          
        })
    
        const [errors, setErrors] = useState({
            email: "",
            
          })
          const [backendError, setBackendError] = useState("")
          const [backendMessage, setBackendMessage] = useState("")
          
         const [disableButton, setDisableButton] = useState(false)
        const [loading, setLoading] = useState(false)
        const [buttonValue, setButtonValue] = useState(<p>Send Reset Link</p>)
        const [timer, setTimer] = useState({
          min:"02",
          sec:"00"
        })
       
         useEffect(
              ()=>{
                if(loading===true){
                  setDisableButton(true);
                  setButtonValue(<div className='flex  justify-center items-center gap-2 '>
                  <div className=' h-5 w-5 border-2 border-border border-t-primary rounded-full animate-spin  flex items-center justify-center'></div>
                  <p>Sending Link</p>
                  </div>
                                  
                  )
                }
                else{
                  setDisableButton(false)
                  setButtonValue(<p>Send Reset Link</p>)
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
      const startWatch = () => {
      let i = 120;

      const interval = setInterval(() => {
        const m = String(Math.floor(i / 60)).padStart(2, "0");
        const s = String(i % 60).padStart(2, "0");

        setTimer({
          min: m,
          sec: s
        });

    if (i === 0) {
      clearInterval(interval);
      setLoading(false);
      setBackendMessage("");
      setTimer({
        min: "02",
        sec: "00"
      });

      return;
    }

    i--;
  }, 1000);
};
      const sendData=async()=>{
        try {
          setLoading(true)
          setBackendError("")
          setBackendMessage("")
          const response=await axios.post("http://localhost:5000/api/auth/forgot-password",{email:formData.email})
          setBackendMessage(response.data?.message)
           setButtonValue(<p>Send Reset Link</p>)
           startWatch();
           
          //  setTimeout(() => {
          //   setLoading(false);
          //  }, 120000);
        } catch (error) {
          setLoading(false)
          setBackendError(error.response?.data?.message)
        }
        
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
        
    
    <div className="flex  flex-col items-center">
      <Button value={buttonValue} disabled={disableButton} onClickAction={sendData}/>
      <p className="text-[0.9rem]" hidden={!backendMessage}>try again in {timer.min}:{timer.sec} min</p>
      
    </div>
    </div>
     <div className={`text-red-700 text-[0.9rem] flex items-center justify-around`}>
      {backendError}
    </div>
    <div className={`text-green-700 text-[0.9rem] flex items-center justify-around`}>
        {backendMessage}
      </div>
    
    </div>
  )
}

export default ForgotPasswordForm
