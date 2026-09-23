import AuthLayout from "../layouts/AuthLayout"; 
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { useState } from "react";
const ForgotPassword = () => {
     
  return (
    <AuthLayout>
        <ForgotPasswordForm/>
    </AuthLayout>
  )
}

export default ForgotPassword
